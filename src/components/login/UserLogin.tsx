"use client";

import { useState } from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import { clientFetch } from "@/lib/client-fetch";
import Link from "next/link";
import { Cloud, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api/api-fech";
import { toast } from "sonner";
import { setAccessTokenToCookie } from "@/services/action.setTokenToCookie";
import { authKey } from "@/constants/storageKey";

function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formFields = [
    {
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email" },
      ],
      input: (
        <Input
          placeholder="Enter your email"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "password",
      label: "Password",
      rules: [{ required: true, message: "Please enter your password" }],
      input: (
        <Input.Password
          placeholder="Enter your password"
          size="large"
          className="rounded-md"
        />
      ),
    },
  ];

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      const res = (await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      })) as { data: { access_token: string } } | null;

      console.log("res", res?.data?.access_token);
      if (res && res.data.access_token) {
        sessionStorage.setItem(authKey, res?.data.access_token);
        router.push("/");
        setLoading(false);
      }
      form.resetFields();
    } catch (err: any) {
      message.error(err.message || "Login failed!");
      setLoading(false);
      // toast.error(err.message || "Login failed!");
    }
  };

  return (
    <div className="py-8 px-5">
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={14}>
          <Card
            className="shadow-md rounded-lg max-w-lg mx-auto!"
            variant="borderless"
            style={{ boxShadow: "0px 4px 6px 2px #00000014" }}
          >
            <div className="rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto w-8 h-8">
              <Cloud className="w-8 h-8 text-yellow-500" />
            </div>

            <h3 className="text-2xl font-bold mb-2 text-center">
              Welcome Back!
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              Sign in to manage your offers and benefits.
            </p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              {formFields.map((field) => (
                <Form.Item
                  key={field.name}
                  label={
                    <span className="text-base text-gray-700">
                      {field.label}
                    </span>
                  }
                  name={field.name}
                  rules={field.rules as any}
                >
                  {field.input}
                </Form.Item>
              ))}

              <div className="flex justify-end mb-4">
                <Link
                  href="/forgot-password" // আপনার password reset route
                  className="text-sm! text-yellow-400! font-medium! hover:underline!"
                >
                  Forgot Password?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  className="h-12 text-base font-medium rounded-md w-full"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-medium text-blue-900 mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs text-blue-800">
                <strong>Admin:</strong> admin@gmail.com / Password@
              </p>
              <p className="text-xs text-blue-800">
                <strong>User:</strong> Create a new account below
              </p>
            </div>

            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-yellow-400! font-medium">
                  Register here
                </Link>
              </span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
