import { Result } from "@/types";
import { atom } from "jotai";

export const scrapingProgress = atom<
  Result<{
    total: number;
    current: number;
    title: string;
    completed?: boolean;
  }>
>({ data: null, error: null });
