import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type ComboBoxData = {
  label: string;
  value: string;
};

export function Combobox({
  data,
  onChange: handleChange,
  defaultValue,
}: {
  data: ComboBoxData[];
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
  defaultValue: string | null;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[200px] w-fit justify-between"
        >
          {defaultValue ? defaultValue : "Pilih Customer..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <div className="h-72 overflow-auto flex flex-col">
          {data.map(({ value, label }, idx) => {
            return (
              <button
                className={`text-left p-2 ${
                  label === defaultValue && "opacity-60"
                } hover:opacity-60 border border-collapse`}
                key={`${value}-${label}-${idx}`}
                onClick={() => {
                  setOpen(false);
                  handleChange(label);
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
