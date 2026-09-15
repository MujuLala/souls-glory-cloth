"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

import { cn } from "@/components/ui/cn";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-line bg-surface text-faint">
        <div className="flex flex-col items-center gap-2">
          <ImageIcon size={26} strokeWidth={1.4} />

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
            No image yet
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={name}
          className="aspect-square w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "size-16 overflow-hidden rounded-lg border transition-colors",
                index === active
                  ? "border-primary"
                  : "border-line hover:border-line-strong",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
