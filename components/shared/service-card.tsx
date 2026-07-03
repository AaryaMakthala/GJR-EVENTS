import {
  Heart,
  Briefcase,
  Sparkles,
  PartyPopper,
  Plane,
  UtensilsCrossed,
  Music,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import type { ServiceItem } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Briefcase,
  Sparkles,
  PartyPopper,
  Plane,
  UtensilsCrossed,
  Music,
  Flower2,
};

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = ICON_MAP[service.icon] ?? Sparkles;

  return (
    <div
      className="
        group
        relative
        h-full
        overflow-hidden
        rounded-3xl
        border
        border-yellow-500/20
        bg-white/[0.03]
        p-8
        backdrop-blur-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-yellow-400
        hover:bg-white/[0.05]
        hover:shadow-[0_0_35px_rgba(212,175,55,0.18)]
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Icon */}
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            border
            border-yellow-500/30
            bg-yellow-500/10
            text-yellow-300
            transition-all
            duration-300
            group-hover:bg-yellow-400
            group-hover:text-black
          "
        >
          <Icon className="h-8 w-8" />
        </div>

        {/* Title */}
        <h3 className="mt-8 text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-yellow-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-4 flex-grow leading-7 text-zinc-400">
          {service.description}
        </p>

        {/* Features */}
        <ul className="mt-8 space-y-3 border-t border-yellow-500/10 pt-6">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />

              <span className="text-sm tracking-wide text-zinc-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}