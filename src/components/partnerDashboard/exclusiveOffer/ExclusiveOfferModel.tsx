"use client";

import { Form, Input, Modal, Upload, Switch, InputNumber, Select, message } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useEffect, useState, useMemo, useRef, use } from "react";
import Editor from "react-simple-wysiwyg";
import { UploadOutlined } from "@ant-design/icons";
import { apiFetch, getImage } from "@/lib/api/api-fech";
import { Offer } from "../ManageOffer/ManageOffersTab";

interface ExclusiveOfferModelProps {
  open: boolean;
  loading: boolean | null;
  editEvent: Offer | null;
  isLoading: boolean;
  onClose: () => void;
  onAdd: (formData: FormData) => Promise<void>;
  onUpdate: (id: string, formData: FormData) => Promise<void>;
  categories: any
}
// const fetchCategories = apiFetch("/category?page=1&limit=60", { method: "GET", cache: "force-cache" }, "client");

export const ExclusiveOfferModel: React.FC<ExclusiveOfferModelProps> = ({
  open,
  loading,
  editEvent,
  isLoading,
  onClose,
  onAdd,
  onUpdate,
  categories
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [html, setHtml] = useState<string>("");
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);
  const [discountEnable, setDiscountEnable] = useState<boolean>(false);

  // Keep a ref to original images for removal
  const originalImagesRef = useRef<{ [uid: string]: string }>({});
  // const categories = use(fetchCategories);

  console.log('categories', categories);
  // Populate form on edit
  useEffect(() => {
    if (editEvent) {
      // Ensure discount defaults
      const discount = editEvent.discount ?? { enable: false, value: 0 };

      form.setFieldsValue({
        name: editEvent.name,
        title: editEvent.title,
        address: editEvent.address || "",
        category: editEvent.category?._id,
        discountEnable: discount.enable,
        discountValue: discount.value,
      });
      setHtml(editEvent.description || "");
      setDiscountEnable(discount.enable);

      // Handle existing images
      const existingImages = editEvent.image;
      let newFileList: UploadFile[] = [];
      let origImagesMap: { [uid: string]: string } = {};

      if (Array.isArray(existingImages)) {
        newFileList = existingImages.map((img, idx) => {
          const uid = String(-1 - idx);
          origImagesMap[uid] = img;
          return {
            uid,
            name: img.split("/").pop() || `image-${idx + 1}.png`,
            status: "done",
            url: getImage(img),
          };
        });
      } else if (typeof existingImages === "string") {
        const uid = "-1";
        origImagesMap[uid] = existingImages;
        newFileList = [
          {
            uid,
            name: (existingImages as string).split("/").pop() || "image.png",
            status: "done",
            url: getImage(existingImages),
          },
        ];
      }

      setFileList(newFileList);
      originalImagesRef.current = origImagesMap;
      setRemovedFiles([]);
    } else {
      // Reset for add
      setFileList([]);
      form.resetFields();
      setHtml("");
      setDiscountEnable(false);
      setRemovedFiles([]);
      originalImagesRef.current = {};
    }
  }, [editEvent, form]);

  const handleRemove = (file: UploadFile) => {
    if (file.status === "done" && file.uid && originalImagesRef.current[file.uid]) {
      setRemovedFiles((prev) => {
        if (!prev.includes(originalImagesRef.current[file.uid])) {
          return [...prev, originalImagesRef.current[file.uid]];
        }
        return prev;
      });
    }
    return true; // allow Ant Upload to remove from UI
  };

  console.log('open', open);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("title", values.title);
      formData.append("address", values.address);
      formData.append("description", html || "");
      if (values.category) formData.append("category", values.category);
      formData.append("discount[enable]", String(!!values.discountEnable));
      formData.append(
        "discount[value]",
        values.discountEnable ? String(values.discountValue || 0) : "0"
      );

      // Append new files
      fileList.forEach((file) => {
        if (file.originFileObj) formData.append("image", file.originFileObj as File);
      });

      // Track removed files
      removedFiles.forEach((img) => formData.append("removedFiles[]", img));

      if (editEvent) {
        await onUpdate(editEvent._id, formData);
      } else {
        await onAdd(formData);
        form.resetFields();
        setFileList([]);
        setHtml("");
        setDiscountEnable(false);
        setRemovedFiles([]);
      }

      if (!open) {
        // Reset after submit
        form.resetFields();
        setFileList([]);
        setHtml("");
        setDiscountEnable(false);
        setRemovedFiles([]);
      }
      originalImagesRef.current = {};
    } catch (err: any) {
      if (err && err.errorFields) return; // form validation errors
      message.error(err?.data?.message || err?.message || "Something went wrong");
    }
  };

  return (
    <Modal
      open={open}
      title={editEvent ? "Edit Exclusive Offer" : "Add Exclusive Offer"}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading || false}
      okText={editEvent ? "Update" : "Create"}
      destroyOnHidden
      width={700}
    // destroyOnHidden  
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ discountEnable: false, discountValue: 0 }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter offer name" }]}
        >
          <Input placeholder="Offer name" />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter offer title" }]}
        >
          <Input placeholder="Offer title" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input placeholder="Address" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            placeholder={isLoading ? "Loading categories..." : "Select category"}
            options={((categories as any) || []).map((cat: any) => ({ label: cat.name, value: cat._id }))}
            loading={isLoading}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item label="Enable Discount" name="discountEnable" valuePropName="checked">
          <Switch
            checked={discountEnable}
            onChange={(checked) => {
              setDiscountEnable(checked);
              form.setFieldsValue({ discountEnable: checked });
              if (!checked) form.setFieldsValue({ discountValue: 0 });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Discount (%)"
          name="discountValue"
          rules={
            discountEnable
              ? [
                { required: true, message: "Please enter discount value" },
                { type: "number", min: 1, max: 100, message: "Enter 1-100" },
              ]
              : []
          }
        >
          <InputNumber
            min={1}
            max={100}
            disabled={!discountEnable}
            style={{ width: "100%" }}
            placeholder="Discount (%)"
          />
        </Form.Item>

        <Form.Item label="Description" style={{ marginBottom: 24 }}>
          <Editor
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            style={{ minHeight: 150 }}
            placeholder="Write Description"
          />
        </Form.Item>

        <Form.Item label="Image">
          <Upload.Dragger
            multiple
            accept=".jpeg,.jpg,.png"
            beforeUpload={(file) => {
              const isValid = ["image/jpeg", "image/jpg", "image/png"].includes(file.type);
              if (!isValid)
                Modal.error({ title: "Invalid file type", content: "Only .jpeg, .png, .jpg allowed" });
              return false; // prevent automatic upload
            }}
            fileList={fileList}
            onChange={(info) => setFileList(info.fileList)}
            onRemove={handleRemove}
            listType="picture"
          >
            <div
              style={{
                width: "100%",
                minHeight: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UploadOutlined style={{ fontSize: 32, color: "#999" }} />
              <p style={{ margin: 8, fontWeight: 500 }}>
                Please upload an image <br />
                <span style={{ color: "#888", fontWeight: 400, fontSize: 13 }}>
                  Recommended size: <strong>390 x 220</strong>
                </span>
              </p>
            </div>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};