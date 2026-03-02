"use client";

import { useState } from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import { apiFetch } from "@/lib/api/api-fech";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
 const router = useRouter();
  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      const res = await apiFetch("/auth/forget-password", {
        method: "POST",
        body: JSON.stringify(values),
      });

      router.push(`/verify-reset-otp?email=${values.email}`);
      form.resetFields();
    } catch (err: any) {
      message.error(err.message || "Failed to send reset email!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-5">
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={14}>
          <Card
            className="shadow-md rounded-lg max-w-lg mx-auto!"
            variant="borderless"
            style={{ boxShadow: "0px 4px 6px 2px #00000014" }}
          >
            <div className="w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-7 h-7 text-yellow-400" />
            </div>

            <h3 className="text-2xl font-bold mb-2 text-center">
              Forgot Password
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your email to receive a password reset link.
            </p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label={<span className="text-base text-gray-700">Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  placeholder="Enter your email"
                  size="large"
                  className="rounded-md"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  className="h-12 text-base font-medium rounded-md w-full"
                >
                  Send Code to Email
                </Button>
              </Form.Item>

              <div className="text-center mt-2">
                <Link
                  href="/partner-login"
                  className="text-sm! text-yellow-400! font-medium! hover:underline!"
                >
                  Back to Login
                </Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ForgotPassword;