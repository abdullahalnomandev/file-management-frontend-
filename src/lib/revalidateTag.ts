"use server";
import { revalidateTag } from "next/cache";

export const revalidateTagType = async (tag: string) => {
  await revalidateTag(tag);
};
