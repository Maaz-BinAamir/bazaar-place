import { formatDistanceToNowStrict } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatShortTimeAgo(timestamp: number) {
  if (timestamp > Date.now() - 5 * 60 * 1000) {
    return "now";
  }

  const result = formatDistanceToNowStrict(new Date(timestamp), {
    addSuffix: true,
    roundingMethod: "floor",
  });

  return result
    .replace(" minutes ago", "m ago")
    .replace(" minute ago", "m ago")
    .replace(" hours ago", "h ago")
    .replace(" hour ago", "h ago")
    .replace(" days ago", "d ago")
    .replace(" day ago", "d ago");
}
