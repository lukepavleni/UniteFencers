import { getInitial } from "~/lib/profile";
import { cn } from "~/lib/utils";

function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground",
        className,
      )}
    >
      {getInitial(name)}
    </div>
  );
}

export { Avatar };
