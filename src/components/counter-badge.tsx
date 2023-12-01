export function CounterBadge({ count }: { count?: number }) {
  if (!count) return null;

  return (
    <span className="bg-foreground text-background absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-2 text-xs font-bold">
      {count}
    </span>
  );
}
