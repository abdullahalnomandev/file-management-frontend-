"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, message, Switch } from "antd";
import { ExclusiveOfferInfoModal } from "../exclusiveOffer/ExclusiveOfferInfoModal";
import { ExclusiveOfferModel } from "../exclusiveOffer/ExclusiveOfferModel";
import { apiFetch } from "@/lib/api/api-fech";
import { revalidateTagType, togglePublishOffer } from "../exclusiveOffer/exclusiveOfferActions";

export interface Offer {
  _id: string;
  name: string;
  title: string;
  address: string;
  location?: { type: "Point"; coordinates: [number, number] };
  image: string[];
  description: string;
  discount?: { enable: boolean; value: number };
  category: { _id: string; name: string };
  published: boolean;
  isFavourite?: boolean;
  status?: "approved" | "pending";
  views?: number;
  redemptions?: number;
}

// Fetch offers once
// const fetchOffers = apiFetch("/exclusive-offer?page=1&limit=100", { method: "GET", cache: "force-cache" }, "client");

export default function ManageOffersTab({ offers, getCategories }: { offers: Offer[], getCategories: any }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(false);



  const handleAddClick = () => {
    setEditingOffer(null);
    setModalOpen(true);
  };

  const handleEditClick = (offer: Offer) => {
    setEditingOffer(offer);
    setModalOpen(true);
  };

  const handleViewClick = (offer: Offer) => {
    setViewItem(offer);
    setViewOpen(true);
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setViewItem(null);
  };

  const handleAddOffer = async (formData: FormData) => {
    setLoading(true);
    try {
      await apiFetch(
        "/exclusive-offer",
        { method: "POST", body: formData },
        "client",
      );
      message.success("Offer added successfully");
      setModalOpen(false);
      revalidateTagType("exclusive-offer");
      // await refreshOffers();
    } catch (err: any) {
      message.error(err?.message || "Failed to add offer");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOffer = async (id: string, formData: FormData) => {
    setLoading(true);
    try {
      await apiFetch(
        `/exclusive-offer/${id}`,
        { method: "PATCH", body: formData },
        "client",
      );
      revalidateTagType("exclusive-offer");
      message.success("Offer updated successfully");
      setModalOpen(false);
      // await refreshOffers();
    } catch (err: any) {
      message.error(err?.message || "Failed to update offer");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (checked: boolean, offer: Offer) => {
    setLoading(true);
    message.success(`Offer ${checked ? "published" : "unpublished"}`);

    await togglePublishOffer(offer._id, checked);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Manage Offers</h2>
          <p className="text-sm text-gray-600">
            Create and manage your partnership offers
          </p>
        </div>
        <Button
          type="primary"
          size="large"
          onClick={handleAddClick}
          className="flex items-center gap-2 font-semibold text-white bg-blue-600 border-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> New Offer
        </Button>
      </div>

      {/* Offers List */}
      {
        !offers.length && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3 max-h-[60vh] overflow-auto">
            <p className="text-sm text-gray-600">No offers found</p>
          </div>
        )
      }

      {
        !!offers.length && <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3 max-h-[60vh] overflow-auto">
          {offers.map((o) => (
            <div
              key={o._id}
              className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{o.name}</p>
                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded mt-1 ${o.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                      }`}
                  >
                    {o.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewClick(o)}
                    className="text-xs text-gray-600 cursor-pointer border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditClick(o)}
                    className="text-xs text-blue-600 cursor-pointer border border-blue-300 rounded px-3 py-1 hover:bg-blue-50 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div className="flex justify-between gap-6 mt-3 text-xs text-gray-600">
                <div className="flex gap-3 items-center">
                  <span>Total Views: {o.views || 0}</span>
                  <span>Redemptions: {o.redemptions || 0}</span>
                </div>
                {o.status === "approved" && (
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 font-medium">
                      Published
                    </span>
                    <Switch
                      size="small"
                      checked={o.published}
                      onChange={(checked) => handleTogglePublish(checked, o)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      }


      {/* Modals */}
      <ExclusiveOfferModel
        open={modalOpen}
        loading={loading || false}
        isLoading={loading || false}
        editEvent={editingOffer as Offer | null}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddOffer}
        onUpdate={handleUpdateOffer}
        categories={getCategories}

      />

      <ExclusiveOfferInfoModal
        open={viewOpen}
        data={viewItem as Offer | null}
        onClose={handleCloseView}
      />
    </div>
  );
}
