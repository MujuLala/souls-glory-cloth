"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { HelpCircle, Pencil, Plus, Trash2, X } from "lucide-react";

import Badge from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import Modal, { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { deleteProductQuestion, saveProductQuestion } from "@/actions/catalog";

export type QuestionRow = {
  id: number;
  question: string;
  helpText: string | null;
  type: string;
  options: string[];
  required: boolean;
  productName: string | null;
  categoryName: string | null;
};

export default function QuestionsClient({
  questions,
  products,
  categories,
}: {
  questions: QuestionRow[];
  products: { id: number; name: string }[];
  categories: { id: number; name: string }[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<QuestionRow | null>(null);
  const [deleting, setDeleting] = useState<QuestionRow | null>(null);

  const [scope, setScope] = useState<"product" | "category">("category");
  const [targetId, setTargetId] = useState("");
  const [question, setQuestion] = useState("");
  const [helpText, setHelpText] = useState("");
  const [type, setType] = useState("Select");
  const [options, setOptions] = useState<string[]>([]);
  const [optionDraft, setOptionDraft] = useState("");
  const [required, setRequired] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openForm = (row?: QuestionRow) => {
    setEditing(row ?? null);
    setScope(row?.productName ? "product" : "category");
    setTargetId("");
    setQuestion(row?.question ?? "");
    setHelpText(row?.helpText ?? "");
    setType(row?.type ?? "Select");
    setOptions(row?.options ?? []);
    setOptionDraft("");
    setRequired(row?.required ?? false);
    setError(null);
    setFormOpen(true);
  };

  const submit = () => {
    startTransition(async () => {
      const result = await saveProductQuestion({
        id: editing?.id,
        productId: scope === "product" ? Number(targetId) || null : null,
        categoryId: scope === "category" ? Number(targetId) || null : null,
        question,
        helpText,
        type,
        options,
        required,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setFormOpen(false);
      toast({ tone: "success", title: editing ? "Question updated" : "Question added" });
      router.refresh();
    });
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-line-subtle p-3">
          <p className="text-xs text-faint">
            {questions.length} question{questions.length === 1 ? "" : "s"}
          </p>

          <Button size="sm" onClick={() => openForm()}>
            <Plus size={15} />
            Add question
          </Button>
        </div>

        {questions.length === 0 ? (
          <EmptyState
            icon={<HelpCircle size={20} />}
            title="No questions configured"
            description="When a shopper attaches a product in chat, we ask sensible defaults until you add your own here."
            action={
              <Button size="sm" onClick={() => openForm()}>
                Add the first question
              </Button>
            }
          />
        ) : (
          <ul className="divide-y divide-line-subtle">
            {questions.map((row) => (
              <li key={row.id} className="flex items-start gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{row.question}</p>

                  <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-faint">
                    <Badge tone="neutral">{row.type}</Badge>
                    {row.productName && <Badge tone="primary">{row.productName}</Badge>}
                    {row.categoryName && <Badge tone="info">{row.categoryName}</Badge>}
                    {row.required && <Badge tone="warning">Required</Badge>}
                  </p>

                  {row.options.length > 0 && (
                    <p className="mt-1.5 text-[11px] text-faint">
                      Options: {row.options.join(", ")}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <IconButton label="Edit question" onClick={() => openForm(row)}>
                    <Pencil size={14} />
                  </IconButton>

                  <IconButton
                    label="Delete question"
                    tone="danger"
                    onClick={() => setDeleting(row)}
                  >
                    <Trash2 size={14} />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit question" : "New question"}
        description="Asked in chat when a shopper attaches a matching product."
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>

            <Button size="sm" loading={pending} onClick={submit}>
              {editing ? "Save changes" : "Add question"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Applies to" htmlFor="q-scope">
              <Select
                id="q-scope"
                value={scope}
                onChange={(value) => {
                  setScope(value as "product" | "category");
                  setTargetId("");
                }}
              >
                <option value="category">A category</option>
                <option value="product">One product</option>
              </Select>
            </Field>

            <Field label={scope === "product" ? "Product" : "Category"} htmlFor="q-target">
              <Select id="q-target" value={targetId} onChange={setTargetId}>
                <option value="">Select…</option>

                {(scope === "product" ? products : categories).map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Question" required htmlFor="q-question">
            <Input
              id="q-question"
              value={question}
              onChange={setQuestion}
              placeholder="How would you like this stitched?"
            />
          </Field>

          <Field label="Help text" htmlFor="q-help">
            <Textarea id="q-help" value={helpText} onChange={setHelpText} rows={2} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Answer type" htmlFor="q-type">
              <Select id="q-type" value={type} onChange={setType}>
                <option value="Select">Choose from options</option>
                <option value="Text">Free text</option>
                <option value="Number">Number</option>
                <option value="Measurement">Pick a person / measurement</option>
                <option value="Date">Date</option>
              </Select>
            </Field>

            <div className="flex items-end pb-2.5">
              <Checkbox checked={required} onChange={setRequired} label="Required" />
            </div>
          </div>

          {type === "Select" && (
            <Field label="Options" htmlFor="q-option">
              <div className="flex gap-2">
                <Input
                  id="q-option"
                  value={optionDraft}
                  onChange={setOptionDraft}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      if (optionDraft.trim()) {
                        setOptions((current) => [...current, optionDraft.trim()]);
                        setOptionDraft("");
                      }
                    }
                  }}
                  placeholder="Type an option, press Enter"
                />
              </div>

              {options.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {options.map((option) => (
                    <span
                      key={option}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] text-ink"
                    >
                      {option}
                      <button
                        type="button"
                        onClick={() =>
                          setOptions((current) => current.filter((item) => item !== option))
                        }
                        className="text-faint hover:text-danger"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </Field>
          )}

          {error && (
            <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger">
              {error}
            </p>
          )}
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          const target = deleting;
          if (!target) return;

          startTransition(async () => {
            const result = await deleteProductQuestion(target.id);
            setDeleting(null);

            if (!result.success) {
              toast({ tone: "error", title: "Not deleted", description: result.error });
              return;
            }

            toast({ tone: "success", title: "Question deleted" });
            router.refresh();
          });
        }}
        loading={pending}
        title="Delete this question?"
        message="It will stop appearing in chat immediately."
      />
    </>
  );
}
