"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Space,
  Tag,
  Card,
  Typography,
  Popconfirm,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { apiFetch } from "@/lib/api/api-fech";

const { Title } = Typography;

interface IPlan {
  id: number;
  name: string;
  total_max_folder: number;
  max_nesting_folder: number;
  allowed_file_type: string[];
  max_file_size: number;
  total_file_limit: number;
  file_per_folder_limit: number;
}

const fileTypeOptions = [
  { label: "JPEG Image", value: "image/jpeg" },
  { label: "PNG Image", value: "image/png" },
  { label: "GIF Image", value: "image/gif" },
  { label: "WebP Image", value: "image/webp" },
  
  { label: "MP4 Video", value: "video/mp4" },
  { label: "WebM Video", value: "video/webm" },
  
  { label: "MP3 Audio", value: "audio/mpeg" },
  { label: "WAV Audio", value: "audio/wav" },
  
  { label: "PDF Document", value: "application/pdf" },
  { label: "Word Document", value: "application/msword" }
];

export default function PlanPackageAdmin() {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<IPlan | null>(null);
  const [form] = Form.useForm();

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/plan-package", {}, "client");
      setPlans((res as { data: IPlan[] }).data || []);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();

      await apiFetch(
        "/plan-package",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        },
        "client"
      );

      message.success("Plan created successfully");
      setModalOpen(false);
      form.resetFields();
      fetchPlans();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      
      await apiFetch(
        `/plan-package/${editingPlan?.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        },
        "client"
      );
      setLoading(false);

      message.success("Plan updated successfully");
      setModalOpen(false);
      setEditingPlan(null);
      form.resetFields();
      fetchPlans();
    } catch (err: any) {
      setLoading(false);
      message.error(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiFetch(
        `/plan-package/${id}`,
        {
          method: "DELETE",
        },
        "client"
      );

      message.success("Plan deleted successfully");
      fetchPlans();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const openCreateModal = () => {
    setEditingPlan(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (record: IPlan) => {
    setEditingPlan(record);
    form.setFieldsValue({
      name: record.name,
      total_max_folder: record.total_max_folder,
      max_nesting_folder: record.max_nesting_folder,
      allowed_file_type: record.allowed_file_type,
      max_file_size: record.max_file_size,
      total_file_limit: record.total_file_limit,
      file_per_folder_limit: record.file_per_folder_limit,
    });
    setModalOpen(true);
  };

  const columns = [
    {
      title: "Plan Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Total Folders",
      dataIndex: "total_max_folder",
      key: "total_max_folder",
    },
    {
      title: "Nesting Level",
      dataIndex: "max_nesting_folder",
      key: "max_nesting_folder",
    },
    {
      title: "Max File Size (MB)",
      dataIndex: "max_file_size",
      key: "max_file_size",
    },
    {
      title: "Total Files",
      dataIndex: "total_file_limit",
      key: "total_file_limit",
    },
    {
      title: "Files per Folder",
      dataIndex: "file_per_folder_limit",
      key: "file_per_folder_limit",
    },
    {
      title: "Allowed Types",
      dataIndex: "allowed_file_type",
      key: "allowed_file_type",
      render: (types: string[]) => (
        <Space wrap>
          {types?.map((type) => (
            <Tag key={type}>{type}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IPlan) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Plan"
            description="Are you sure you want to delete this plan?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <Card className="shadow-sm rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="mb-0!">
            Plan Package Management
          </Title>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={openCreateModal}
          >
            Create Plan
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={plans}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={editingPlan ? "Edit Plan" : "Create New Plan"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingPlan(null);
          form.resetFields();
        }}
        onOk={editingPlan ? handleEdit : handleCreate}
        okText={editingPlan ? "Update Plan" : "Create Plan"}
        width={700}
        confirmLoading={loading}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Plan Name"
            name="name"
            rules={[{ required: true, message: "Plan name is required" }]}
          >
            <Input placeholder="Enter plan name (e.g. Gold)" />
          </Form.Item>

          <Form.Item
            label="Total Max Folder"
            name="total_max_folder"
            rules={[{ required: true, message: "Total max folder is required" }]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>

          <Form.Item
            label="Max Nesting Folder"
            name="max_nesting_folder"
            rules={[{ required: true, message: "Max nesting folder is required" }]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>

          <Form.Item
            label="Allowed File Types"
            name="allowed_file_type"
            rules={[{ required: true, message: "Allowed file types are required" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select file types"
              options={fileTypeOptions}
            />
          </Form.Item>

          <Form.Item
            label="Max File Size (MB)"
            name="max_file_size"
            rules={[{ required: true, message: "Max file size is required" }]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>

          <Form.Item
            label="Total File Limit"
            name="total_file_limit"
            rules={[{ required: true, message: "Total file limit is required" }]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>

          <Form.Item
            label="File Per Folder Limit"
            name="file_per_folder_limit"
            rules={[{ required: true, message: "File per folder limit is required" }]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}