"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  FileDown,
  Trash2,
} from "lucide-react";

import Breadcrumbs from "./Breadcrumbs";
import { products } from "./data";

type ImportRow = {
  name: string;
  sku: string;
  slug: string;
  category: string;
  subcategory: string;
  price: string;
  stock: string;
  status: string;
};

export default function ImportExport() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [importRows, setImportRows] = useState<ImportRow[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =====================================================
     EXPORT PRODUCTS
  ===================================================== */

  const exportProducts = () => {
    const headers = [
      "name",
      "sku",
      "slug",
      "category",
      "subcategory",
      "price",
      "stock",
      "status",
      "tags",
      "sizes",
      "colors",
    ];

    const rows = products.map((product) => [
      product.name,
      product.sku,
      product.slug,
      product.category,
      product.subcategory,
      product.price,
      product.stock,
      product.status,
      product.tags.join("|"),
      product.sizes.join("|"),
      product.colors.join("|"),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    downloadCSV(csv, "products-export.csv");

    setSuccess(`${products.length} products exported successfully.`);
    setError("");
  };

  /* =====================================================
     DOWNLOAD TEMPLATE
  ===================================================== */

  const downloadTemplate = () => {
    const headers = [
      "name",
      "sku",
      "slug",
      "category",
      "subcategory",
      "price",
      "stock",
      "status",
      "tags",
      "sizes",
      "colors",
    ];

    const example = [
      "Classic Men's Suit",
      "SUIT-001",
      "classic-mens-suit",
      "Men Collection",
      "Suits",
      "120",
      "25",
      "Active",
      "Premium|Formal|Featured",
      "S|M|L|XL|XXL",
      "Black|Navy|Grey",
    ];

    const csv = [
      headers.join(","),
      example
        .map((value) => `"${value.replace(/"/g, '""')}"`)
        .join(","),
    ].join("\n");

    downloadCSV(csv, "products-import-template.csv");

    setSuccess("Import template downloaded.");
    setError("");
  };

  /* =====================================================
     IMPORT FILE
  ===================================================== */

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");
    setImportRows([]);
    setFileName(file.name);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = String(e.target?.result ?? "");

      try {
        const rows = parseCSV(text);

        if (rows.length === 0) {
          setError("The CSV file does not contain any products.");
          return;
        }

        setImportRows(rows);
        setSuccess(`${rows.length} products ready to import.`);
      } catch {
        setError(
          "Unable to read this CSV file. Please use the provided template."
        );
      }
    };

    reader.readAsText(file);
  };

  /* =====================================================
     CLEAR IMPORT
  ===================================================== */

  const clearImport = () => {
    setImportRows([]);
    setFileName("");
    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =====================================================
     IMPORT PRODUCTS
  ===================================================== */

  const importProducts = () => {
    if (importRows.length === 0) {
      setError("Please upload a CSV file first.");
      return;
    }

    /*
     * Static-data mode:
     * The imported data is previewed and validated here.
     *
     * Later, replace this section with your API/database
     * request when the backend is connected.
     */

    setSuccess(
      `${importRows.length} products imported successfully.`
    );
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f7f7f7]">
      <main className="w-full pl-8 pr-8 md:w-[100%]">
        <div className="mx-auto w-full max-w-[92vw] px-0 py-5 sm:py-6">

          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              {
                label: "Products",
                href: "/products",
              },
              {
                label: "Import / Export",
              },
            ]}
          />

          {/* Header */}
          <section className="mb-6 flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">

              <Link
                href="/products"
                aria-label="Back to products"
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-500 transition hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
              >
                <ArrowLeft size={16} />
              </Link>

              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Import / Export
                </h1>

                <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
                  Import products from CSV or export your product catalog.
                </p>
              </div>

            </div>
          </section>

          {/* Notifications */}
          {success && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-xs text-emerald-400">
              <CheckCircle2 size={16} />
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Import / Export Cards */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            {/* Import */}
            <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff1638]/10 text-[#ff1638]">
                  <Upload size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Import Products
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-neutral-600">
                    Upload a CSV file to import products into your catalog.
                  </p>
                </div>

              </div>

              {/* Upload Area */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 flex min-h-[180px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.12] bg-black/20 px-5 text-center transition hover:border-[#ff1638]/40 hover:bg-[#ff1638]/[0.02]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-neutral-500">
                  <FileSpreadsheet size={22} />
                </div>

                <p className="mt-4 text-sm font-medium text-neutral-300">
                  {fileName || "Upload CSV file"}
                </p>

                <p className="mt-1 text-[11px] text-neutral-600">
                  Click to browse or select a CSV file
                </p>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Import Actions */}
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">

                <button
                  type="button"
                  onClick={importProducts}
                  disabled={importRows.length === 0}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ff1638] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#ff2948] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Upload size={15} />
                  Import Products
                </button>

                <button
                  type="button"
                  onClick={downloadTemplate}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-xs font-medium text-neutral-400 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <FileDown size={15} />
                  Template
                </button>

              </div>

            </section>

            {/* Export */}
            <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff1638]/10 text-[#ff1638]">
                  <Download size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Export Products
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-neutral-600">
                    Download your current product catalog as a CSV file.
                  </p>
                </div>

              </div>

              {/* Export Info */}
              <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 p-4">

                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-600">
                    Products
                  </span>

                  <span className="text-sm font-semibold">
                    {products.length}
                  </span>
                </div>

                <div className="my-3 h-px bg-white/[0.06]" />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-600">
                    Export format
                  </span>

                  <span className="rounded-md bg-white/[0.05] px-2 py-1 text-[10px] text-neutral-400">
                    CSV
                  </span>
                </div>

              </div>

              <button
                type="button"
                onClick={exportProducts}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-xs font-bold text-white transition hover:bg-white/[0.06]"
              >
                <Download size={15} />
                Export All Products
              </button>

            </section>

          </div>

          {/* Import Preview */}
          {importRows.length > 0 && (
            <section className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">

              <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-sm font-semibold">
                    Import Preview
                  </h2>

                  <p className="mt-1 text-xs text-neutral-600">
                    Review the products before importing them.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearImport}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-neutral-500 transition hover:border-[#ff1638]/30 hover:text-[#ff1638]"
                >
                  <Trash2 size={14} />
                  Clear
                </button>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px] text-left">

                  <thead>
                    <tr className="border-b border-white/[0.06] text-[10px] uppercase tracking-wider text-neutral-600">
                      <th className="px-4 py-3 font-medium">
                        Product
                      </th>

                      <th className="px-4 py-3 font-medium">
                        SKU
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Category
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Price
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Stock
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {importRows.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/[0.05] last:border-0"
                      >
                        <td className="px-4 py-3 text-xs font-medium text-neutral-300">
                          {row.name || "—"}
                        </td>

                        <td className="px-4 py-3 text-xs text-neutral-500">
                          {row.sku || "—"}
                        </td>

                        <td className="px-4 py-3 text-xs text-neutral-500">
                          {row.category || "—"}
                        </td>

                        <td className="px-4 py-3 text-xs text-neutral-400">
                          ${row.price || "0"}
                        </td>

                        <td className="px-4 py-3 text-xs text-neutral-500">
                          {row.stock || "0"}
                        </td>

                        <td className="px-4 py-3">
                          <span className="rounded-full bg-white/[0.05] px-2 py-1 text-[9px] text-neutral-400">
                            {row.status || "Active"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>

            </section>
          )}

          {/* CSV Instructions */}
          <section className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-neutral-500">
                <FileSpreadsheet size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  CSV Import Format
                </h2>

                <p className="mt-1 text-xs leading-5 text-neutral-600">
                  Use the downloadable template to ensure your CSV has
                  the correct columns and formatting.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "name",
                    "sku",
                    "slug",
                    "category",
                    "subcategory",
                    "price",
                    "stock",
                    "status",
                    "tags",
                    "sizes",
                    "colors",
                  ].map((field) => (
                    <span
                      key={field}
                      className="rounded-md border border-white/[0.06] bg-black/20 px-2 py-1 text-[10px] text-neutral-600"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}

/* =========================================================
   CSV PARSER
========================================================= */

function parseCSV(text: string): ImportRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCSVLine(lines[0]).map((header) =>
    header.trim().toLowerCase()
  );

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);

    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    return {
      name: row.name ?? "",
      sku: row.sku ?? "",
      slug: row.slug ?? "",
      category: row.category ?? "",
      subcategory: row.subcategory ?? "",
      price: row.price ?? "",
      stock: row.stock ?? "",
      status: row.status ?? "",
    };
  });
}

/* =========================================================
   CSV LINE PARSER
========================================================= */

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    const nextCharacter = line[i + 1];

    if (character === '"' && insideQuotes && nextCharacter === '"') {
      current += '"';
      i++;
      continue;
    }

    if (character === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (character === "," && !insideQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current.trim());

  return values;
}

/* =========================================================
   DOWNLOAD CSV
========================================================= */

function downloadCSV(csv: string, fileName: string) {
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}