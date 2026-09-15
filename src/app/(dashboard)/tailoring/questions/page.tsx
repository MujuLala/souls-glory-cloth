import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import QuestionsClient from "@/components/dashboard/tailoring/QuestionsClient";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Product questions" };

export default async function QuestionsPage() {
  const [questions, products, categories] = await Promise.all([
    prisma.productQuestion.findMany({
      orderBy: [{ productId: "desc" }, { sortOrder: "asc" }],
      include: {
        product: { select: { name: true } },
        category: { select: { name: true } },
      },
    }),
    prisma.product.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  const rows = questions.map((row) => ({
    id: row.id,
    question: row.question,
    helpText: row.helpText,
    type: row.type,
    options: Array.isArray(row.options) ? (row.options as string[]) : [],
    required: row.required,
    productName: row.product?.name ?? null,
    categoryName: row.category?.name ?? null,
  }));

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tailoring", href: "/tailoring" },
          { label: "Product questions" },
        ]}
      />

      <PageHeader
        title="Product questions"
        description="What the chat widget asks a shopper once they attach a product — configure it per category or per product."
      />

      <QuestionsClient questions={rows} products={products} categories={categories} />
    </PageShell>
  );
}
