import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const options = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  };
  return new Date(dateString).toLocaleString("en-US", options);
}
