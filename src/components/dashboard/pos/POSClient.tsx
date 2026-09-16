"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  Banknote,
  CheckCircle2,
  Loader2,
  Minus,
  Package,
  Plus,
  Printer,
  Search,
  ShoppingCart,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import Badge from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/components/ui/cn";
import EmptyState from "@/components/ui/empty-state";
import { Field, Input, Select } from "@/components/ui/field";
import Modal from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { formatMoney, formatTime } from "@/lib/format";
import { PAYMENT_METHODS } from "@/lib/constants";
import {
  completeSale,
  findOrCreatePosCustomer,
  openPosSession,
} from "@/actions/pos";
import type { PosProduct } from "@/data/pos";

type CartLine = {
  productId: number;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  maxStock: number | null;
};

type Session = {
  id: number;
  code: string;
  openingFloat: number;
  saleCount: number;
  salesTotal: number;
} | null;

type RecentSale = {
  id: number;
  saleNumber: string;
  customerName: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
};

export default function POSClient({
  products,
  session,
  recentSales,
  cashierName,
}: {
  products: PosProduct[];
  session: Session;
  recentSales: RecentSale[];
  cashierName: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [discount, setDiscount] = useState("0");
  const [paymentMethod, setPaymentMethod] = useState<string>(PAYMENT_METHODS[0]);
  const [tendered, setTendered] = useState("");

  const [customer, setCustomer] = useState<{ id: number; fullName: string } | null>(null);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerLookupError, setCustomerLookupError] = useState<string | null>(null);

  const [openingFloat, setOpeningFloat] = useState("0");
  const [receipt, setReceipt] = useState<{
    orderNumber: string;
    total: number;
    paid: number;
    change: number;
  } | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => product.category && set.add(product.category));
    return ["All", ...Array.from(set).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      if (category !== "All" && product.category !== category) return false;
      if (!term) return true;
      return (
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term)
      );
    });
  }, [products, search, category]);

  /* =======================================================
     CART
  ======================================================= */

  const addToCart = (product: PosProduct) => {
    if (product.trackInventory && product.stock <= 0) {
      toast({ tone: "warning", title: `${product.name} is out of stock` });
      return;
    }

    setCart((current) => {
      const existing = current.find((line) => line.productId === product.id);

      if (existing) {
        if (product.trackInventory && existing.quantity >= product.stock) {
          toast({ tone: "warning", title: "No more stock available" });
          return current;
        }

        return current.map((line) =>
          line.productId === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }

      return [
        ...current,
        {
          productId: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          quantity: 1,
          maxStock: product.trackInventory ? product.stock : null,
        },
      ];
    });
  };

  const setQuantity = (productId: number, quantity: number) => {
    setCart((current) =>
      quantity <= 0
        ? current.filter((line) => line.productId !== productId)
        : current.map((line) =>
            line.productId === productId
              ? {
                  ...line,
                  quantity:
                    line.maxStock !== null
                      ? Math.min(quantity, line.maxStock)
                      : quantity,
                }
              : line,
          ),
    );
  };

  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const discountValue = Math.min(Number(discount) || 0, subtotal);
  const total = subtotal - discountValue;
  const tenderedValue = Number(tendered) || 0;
  const change = Math.max(0, tenderedValue - total);

  /* =======================================================
     CUSTOMER LOOKUP
  ======================================================= */

  const lookupCustomer = () => {
    setCustomerLookupError(null);

    startTransition(async () => {
      const result = await findOrCreatePosCustomer({
        phone: customerPhone,
        fullName: customerName,
      });

      if (!result.success) {
        setCustomerLookupError(result.error);
        return;
      }

      setCustomer(result.data);
      setCustomerModalOpen(false);
      setCustomerPhone("");
      setCustomerName("");
    });
  };

  /* =======================================================
     CHECKOUT
  ======================================================= */

  const checkout = () => {
    if (cart.length === 0) {
      toast({ tone: "warning", title: "The cart is empty" });
      return;
    }

    startTransition(async () => {
      const result = await completeSale({
        sessionId: session?.id ?? null,
        customerId: customer?.id ?? null,
        lines: cart.map((line) => ({ productId: line.productId, quantity: line.quantity })),
        discount: discountValue,
        paymentMethod,
        amountTendered: tenderedValue || total,
      });

      if (!result.success) {
        toast({ tone: "error", title: "Sale failed", description: result.error });
        return;
      }

      setReceipt({
        orderNumber: result.data.orderNumber,
        total: result.data.total,
        paid: result.data.paid,
        change: result.data.change,
      });

      setCart([]);
      setDiscount("0");
      setTendered("");
      setCustomer(null);
      router.refresh();
    });
  };

  /* =======================================================
     NO OPEN SESSION → SHOW OPEN-REGISTER SCREEN
  ======================================================= */

  if (!session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-[420px] p-6 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary/12 text-primary">
            <Banknote size={22} />
          </span>

          <h2 className="mt-4 text-lg font-bold text-ink">Open the register</h2>

          <p className="mt-2 text-[12px] leading-5 text-faint">
            Enter your opening cash float to start a POS session,{" "}
            {cashierName}.
          </p>

          <Field label="Opening float" htmlFor="opening-float" className="mt-4 text-left">
            <Input
              id="opening-float"
              type="number"
              min={0}
              value={openingFloat}
              onChange={setOpeningFloat}
            />
          </Field>

          <Button
            fullWidth
            className="mt-4"
            loading={pending}
            onClick={() =>
              startTransition(async () => {
                const result = await openPosSession(Number(openingFloat) || 0);

                if (!result.success) {
                  toast({ tone: "error", title: "Could not open register" });
                  return;
                }

                router.refresh();
              })
            }
          >
            Open register
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
      {/* ===================================================
          PRODUCTS
      =================================================== */}

      <div>
        <Card className="mb-3 flex flex-col gap-2.5 p-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products or scan SKU…"
              autoFocus
              className="h-10 w-full rounded-lg border border-line bg-input pl-9 pr-3 text-xs text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
            />
          </div>

          <Select value={category} onChange={setCategory} className="h-10 sm:w-[180px]">
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Card>

        {filteredProducts.length === 0 ? (
          <Card>
            <EmptyState icon={<Package size={20} />} title="No products match" />
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const outOfStock = product.trackInventory && product.stock <= 0;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => addToCart(product)}
                  disabled={outOfStock}
                  className={cn(
                    "flex flex-col rounded-xl border border-line bg-card p-2.5 text-left transition-colors",
                    outOfStock
                      ? "cursor-not-allowed opacity-50"
                      : "hover:border-primary/40 hover:bg-card-hover",
                  )}
                >
                  <span className="grid aspect-square place-items-center overflow-hidden rounded-lg bg-surface text-faint">
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image} alt="" className="size-full object-cover" />
                    ) : (
                      <Package size={20} />
                    )}
                  </span>

                  <span className="mt-2 line-clamp-2 text-[11.5px] font-semibold leading-4 text-ink">
                    {product.name}
                  </span>

                  <span className="mt-1 flex items-center justify-between">
                    <span className="text-[12px] font-bold text-primary">
                      {formatMoney(product.price)}
                    </span>

                    {product.trackInventory && (
                      <span
                        className={cn(
                          "text-[10px]",
                          product.stock <= 5 ? "text-warning" : "text-faint",
                        )}
                      >
                        {product.stock} left
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ===================================================
          CART / CHECKOUT
      =================================================== */}

      <div className="space-y-3">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between gap-2 border-b border-line-subtle p-3">
            <div className="flex items-center gap-2">
              <ShoppingCart size={16} className="text-primary" />
              <span className="text-[13px] font-semibold text-ink">
                Current sale
              </span>
            </div>

            <Badge tone="neutral">{session.code}</Badge>
          </div>

          {/* CUSTOMER */}
          <div className="border-b border-line-subtle p-3">
            {customer ? (
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[12.5px] text-ink">
                  <UserRound size={14} className="text-primary" />
                  {customer.fullName}
                </span>

                <button
                  type="button"
                  onClick={() => setCustomer(null)}
                  aria-label="Remove customer"
                  className="text-faint hover:text-danger"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                fullWidth
                onClick={() => setCustomerModalOpen(true)}
              >
                <UserRound size={14} />
                Add customer (optional)
              </Button>
            )}
          </div>

          {/* LINES */}
          <div className="max-h-[280px] overflow-y-auto scrollbar-thin">
            {cart.length === 0 ? (
              <p className="p-6 text-center text-[12px] text-faint">
                Tap a product to add it
              </p>
            ) : (
              <ul className="divide-y divide-line-subtle">
                {cart.map((line) => (
                  <li key={line.productId} className="flex items-center gap-2 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-medium text-ink">
                        {line.name}
                      </p>
                      <p className="text-[10.5px] text-faint">
                        {formatMoney(line.price)} each
                      </p>
                    </div>

                    <div className="flex items-center rounded-lg border border-line">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.productId, line.quantity - 1)}
                        className="grid size-7 place-items-center text-muted"
                        aria-label="Decrease"
                      >
                        <Minus size={11} />
                      </button>

                      <span className="w-6 text-center text-[11px] font-semibold text-ink">
                        {line.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => setQuantity(line.productId, line.quantity + 1)}
                        className="grid size-7 place-items-center text-muted"
                        aria-label="Increase"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    <span className="w-16 shrink-0 text-right text-[12px] font-bold text-ink">
                      {formatMoney(line.price * line.quantity)}
                    </span>

                    <IconButton
                      label="Remove"
                      tone="danger"
                      onClick={() => setQuantity(line.productId, 0)}
                    >
                      <Trash2 size={13} />
                    </IconButton>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TOTALS */}
          <div className="space-y-2 border-t border-line-subtle p-3">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-muted">Subtotal</span>
              <span className="text-ink">{formatMoney(subtotal)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[12px] text-muted">Discount</span>
              <input
                type="number"
                min={0}
                value={discount}
                onChange={(event) => setDiscount(event.target.value)}
                className="ml-auto h-8 w-24 rounded-md border border-line bg-input px-2 text-right text-[12px] text-ink outline-none"
              />
            </div>

            <div className="flex items-center justify-between border-t border-line-subtle pt-2 text-[15px] font-bold">
              <span className="text-ink">Total</span>
              <span className="text-ink">{formatMoney(total)}</span>
            </div>

            <Select
              value={paymentMethod}
              onChange={setPaymentMethod}
              className="h-10"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </Select>

            {paymentMethod === "Cash" && (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  value={tendered}
                  onChange={setTendered}
                  placeholder="Cash tendered"
                  className="h-10"
                />

                <span className="shrink-0 whitespace-nowrap text-[11px] text-muted">
                  Change {formatMoney(change)}
                </span>
              </div>
            )}

            <Button
              fullWidth
              size="lg"
              loading={pending}
              disabled={cart.length === 0}
              onClick={checkout}
            >
              <CheckCircle2 size={16} />
              Complete sale — {formatMoney(total)}
            </Button>
          </div>
        </Card>

        {/* SESSION SUMMARY */}
        <Card className="p-3">
          <p className="text-[11px] text-faint">
            Session sales: {session.saleCount} · {formatMoney(session.salesTotal)}
          </p>
        </Card>

        {/* RECENT SALES */}
        {recentSales.length > 0 && (
          <Card className="overflow-hidden">
            <div className="border-b border-line-subtle p-3">
              <p className="text-[12px] font-semibold text-ink">Recent sales</p>
            </div>

            <ul className="divide-y divide-line-subtle">
              {recentSales.map((sale) => (
                <li key={sale.id} className="flex items-center justify-between p-2.5 text-[11.5px]">
                  <span className="text-muted">
                    {sale.customerName} · {formatTime(sale.createdAt)}
                  </span>

                  <span className="font-semibold text-ink">{formatMoney(sale.total)}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/* ===================================================
          CUSTOMER MODAL
      =================================================== */}

      <Modal
        open={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        title="Find or add customer"
        size="sm"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setCustomerModalOpen(false)}>
              Cancel
            </Button>

            <Button size="sm" loading={pending} onClick={lookupCustomer}>
              Continue
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <Field label="Phone number" required htmlFor="pos-customer-phone">
            <Input
              id="pos-customer-phone"
              type="tel"
              value={customerPhone}
              onChange={setCustomerPhone}
              placeholder="03xx xxxxxxx"
            />
          </Field>

          <Field
            label="Name"
            htmlFor="pos-customer-name"
            hint="Only needed for a new customer."
          >
            <Input
              id="pos-customer-name"
              value={customerName}
              onChange={setCustomerName}
            />
          </Field>

          {customerLookupError && (
            <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger">
              {customerLookupError}
            </p>
          )}
        </div>
      </Modal>

      {/* ===================================================
          RECEIPT
      =================================================== */}

      <Modal
        open={Boolean(receipt)}
        onClose={() => setReceipt(null)}
        title="Sale complete"
        size="sm"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => window.print()}>
              <Printer size={14} />
              Print receipt
            </Button>

            <Button size="sm" onClick={() => setReceipt(null)}>
              New sale
            </Button>
          </>
        }
      >
        {receipt && (
          <div className="text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-success/12 text-success">
              <CheckCircle2 size={24} />
            </span>

            <p className="mt-3 text-[13px] font-semibold text-ink">
              Order {receipt.orderNumber}
            </p>

            <dl className="mt-3 space-y-1.5 text-[12px]">
              <div className="flex justify-between">
                <dt className="text-muted">Total</dt>
                <dd className="text-ink">{formatMoney(receipt.total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Paid</dt>
                <dd className="text-ink">{formatMoney(receipt.paid)}</dd>
              </div>
              <div className="flex justify-between font-bold">
                <dt className="text-ink">Change</dt>
                <dd className="text-ink">{formatMoney(receipt.change)}</dd>
              </div>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  );
}
