"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQS } from "@/lib/constants";

export function Faq() {
  return (
    <section className="section-y bg-background">
      <div className="container-luxe max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Good to Know
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <AccordionPrimitive.Root type="single" collapsible className="mt-10">
          {FAQS.map((faq) => (
            <AccordionPrimitive.Item
              key={faq.id}
              value={faq.id}
              className="border-b border-border"
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger
                  className={cn(
                    "group flex w-full items-center justify-between py-5 text-left font-serif text-lg font-medium transition-colors hover:text-primary"
                  )}
                >
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden pb-5 text-sm text-muted-foreground data-[state=closed]:animate-none data-[state=open]:animate-fade-in">
                {faq.answer}
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}
