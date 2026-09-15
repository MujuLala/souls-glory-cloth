"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Download, FileSpreadsheet, Upload } from "lucide-react";

import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { importProducts, type ImportSummary } from "@/actions/import";

/* =========================================================
   CSV PARSER

   Small hand-rolled reader rather than a dependency: it
   handles quoted fields, escaped quotes and CRLF, which is
   everything a spreadsheet export produces.
========================================================= */

function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];

  let field = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inQuotes) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }

      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [header, ...body] = rows.filter((entry) =>
    entry.some((value) => value.trim()),
  );

  if (!header) {
    return [];
  }

  const keys = header.map((key) => key.trim());

  return body.map((entry) => {
    const record: Record<string, string> = {};

    keys.forEach((key, position) => {
      record[key] = (entry[position] ?? "").trim();
    });

    return record;
  });
}

const templateColumns =
  "sku,name,slug,description,category,collection,price,salePrice,costPrice,stock,lowStockThreshold,status,badge,featured,sizes,colors,tags,image";

export default function ImportExportClient() {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [fileName, setFileName] = useState<string | null>(null);
  const [summary, setSummary] = useState<ImportSummary | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    setFileName(file.name);
    setSummary(null);

    const text = await file.text();
    const rows = parseCsv(text);

    if (rows.length === 0) {
      toast({
        tone: "error",
        title: "Nothing to import",
        description: "That file had no data rows.",
      });
      return;
    }

    startTransition(async () => {
      const result = await importProducts(rows);

      if (!result.success) {
        toast({
          tone: "error",
          title: "Import failed",
          description: result.error,
        });
        return;
      }

      setSummary(result.data);

      toast({
        tone: result.data.errors.length ? "warning" : "success",
        title: `${result.data.created} created, ${result.data.updated} updated`,
        description: result.data.errors.length
          ? `${result.data.errors.length} row(s) were skipped.`
          : undefined,
      });

      router.refresh();
    });
  };

  const downloadTemplate = () => {
    const blob = new Blob(
      [
        `${templateColumns}\r\n` +
          `SGC-001,Ivory Silk Sherwani,ivory-silk-sherwani,Hand-finished sherwani,Menswear,Wedding,45000,39000,26000,8,3,Active,New,yes,M|L|XL,Ivory|Black,wedding|silk,`,
      ],
      { type: "text/csv" },
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "product-import-template.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* ===================================================
          IMPORT
      =================================================== */}

      <Card>
        <CardHeader
          title="Import products"
          description="Upload a CSV. Rows are matched on SKU — existing products update, new ones are created."
          icon={<Upload size={16} />}
        />

        <CardBody className="space-y-4">
          <label
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong px-6 py-10 text-center transition-colors hover:border-primary/50 ${
              pending ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <FileSpreadsheet size={22} className="text-faint" />

            <span className="text-[13px] font-semibold text-ink">
              {pending
                ? "Importing…"
                : fileName
                  ? fileName
                  : "Choose a CSV file"}
            </span>

            <span className="text-[11px] text-faint">
              Up to 1000 rows per import
            </span>

            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(event) => void handleFile(event.target.files?.[0])}
            />
          </label>

          <Button variant="secondary" size="sm" onClick={downloadTemplate}>
            <Download size={14} />
            Download template
          </Button>

          {summary && (
            <div className="rounded-xl border border-line bg-surface p-3">
              <p className="text-[12px] font-semibold text-ink">
                {summary.created} created · {summary.updated} updated ·{" "}
                {summary.skipped} skipped
              </p>

              {summary.errors.length > 0 && (
                <ul className="mt-2 space-y-1 text-[11px] text-danger">
                  {summary.errors.slice(0, 8).map((issue) => (
                    <li key={issue.row}>
                      Row {issue.row}: {issue.message}
                    </li>
                  ))}

                  {summary.errors.length > 8 && (
                    <li className="text-faint">
                      …and {summary.errors.length - 8} more.
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      {/* ===================================================
          EXPORT
      =================================================== */}

      <Card>
        <CardHeader
          title="Export products"
          description="Download the full catalogue as a CSV — useful for bulk price edits, or as a backup."
          icon={<Download size={16} />}
        />

        <CardBody className="space-y-4">
          <p className="text-[12px] leading-5 text-muted">
            The export uses the same column layout as the import template, so
            you can edit the file and upload it straight back.
          </p>

          <ul className="space-y-1.5 text-[11px] text-faint">
            <li>· Sizes, colours and tags are separated by a pipe (|).</li>
            <li>· Only the main image URL is exported.</li>
            <li>· Variants are not included in the CSV format.</li>
          </ul>

          <Button href="/api/products/export" size="sm">
            <Download size={14} />
            Export CSV
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
