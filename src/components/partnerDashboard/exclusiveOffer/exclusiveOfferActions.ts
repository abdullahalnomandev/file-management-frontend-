// app/actions/exclusiveOfferActions.ts
"use server";
import { apiFetch } from "@/lib/api/api-fech";
import { revalidateTag } from "next/cache";

export async function togglePublishOffer(offerId: string, published: boolean) {
  try {
    // Update the offer via API or directly in your DB
    await apiFetch(`/exclusive-offer/${offerId}`, {
      method: "PATCH",
      body: JSON.stringify({ published }),
      headers: { "Content-Type": "application/json" },
    },"server");

    // Invalidate the server cache for the tag
    revalidateTag("exclusive-offer");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update publish status" };
  }
}

export async function addExclusiveOffer(formData: FormData) {
  try {
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    await apiFetch("/exclusive-offer", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    revalidateTag("exclusive-offer");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to add offer" };
  }
}

export const revalidateTagType = async (tag: string) => {
  await revalidateTag(tag);
};
