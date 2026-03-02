"use client";
import { useState, useRef, useEffect } from "react";
import { Row, Col, Card, message, Typography, Input, Button, Form } from "antd";
import { apiFetch } from "@/lib/api/api-fech";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

const { Text } = Typography;

function VerifyOtpProfessional({ email }: { email: string }) {
  const [step, setStep] = useState<"otp" | "changePassword">("otp");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);


  useEffect(() => {
    if (step === "otp") inputsRef.current[0]?.focus();
  }, [step]);

  if (!email) {
    return (
      <div className="py-16 px-5 text-center">
        <p className="text-red-500">No email provided. Please go back to Forgot Password page.</p>
        <Link href="/forgot-password" className="text-yellow-400 font-medium hover:underline">
          Back to Forgot Password
        </Link>
      </div>
    );
  }

  // Resend OTP
  const resendOTP = async () => {
    setLoading(true);
    try {
      await apiFetch("/auth/forget-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      message.success("OTP resent successfully!");
    } catch (err: any) {
      message.error(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    const code = otp.join("");
    if (code.length !== 6) return message.error("Please enter 6-digit OTP");

    setLoading(true);
    try {
      await apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ otp:code }),
      });
      setStep("changePassword");
    } catch (err: any) {
      message.error(err.message || "OTP verification failed!");
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) return message.error("Please fill all fields");
    if (newPassword !== confirmPassword) return message.error("Passwords do not match");

    setLoading(true);
    try {
      await apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          otp: otp.join(""),
          newPassword,
          confirmPassword,
        }),
      });
      message.success("Password changed successfully!");
      router.push("/login");
    } catch (err: any) {
      message.error(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
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
              {step === "otp" ? "Verify OTP" : "Reset Password"}
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              {step === "otp"
                ? "Enter the 6-digit OTP sent to your email."
                : "Set your new password below."}
            </p>

            {step === "otp" && (
              <>
                <div className="flex justify-center gap-4 mb-4">
                  {otp.map((digit, idx) => (
                    <Input
                      key={idx}
                      ref={(el: any) => (inputsRef.current[idx] = el)}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      maxLength={1}
                      size="large"
                      className="w-14 h-14 text-center text-xl font-bold rounded-md border border-gray-300"
                    />
                  ))}
                </div>
                <div className="flex justify-between mb-4">
                  <Button type="link" onClick={resendOTP}>
                    Resend OTP
                  </Button>
                  <Text type="secondary">Sent to: {email}</Text>
                </div>
                <Button
                  type="primary"
                  block
                  size="large"
                  loading={loading}
                  onClick={verifyOTP}
                  className="h-12 text-base font-medium rounded-md"
                >
                  Verify OTP
                </Button>
              </>
            )}

            {step === "changePassword" && (
              <Form layout="vertical">
                <Form.Item label="New Password" required>
                  <Input.Password
                    placeholder="Enter new password"
                    size="large"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="rounded-md mb-4"
                  />
                </Form.Item>
                <Form.Item label="Confirm Password" required>
                  <Input.Password
                    placeholder="Confirm new password"
                    size="large"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-md mb-4"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  block
                  size="large"
                  loading={loading}
                  onClick={resetPassword}
                  className="h-12 text-base font-medium rounded-md"
                >
                  Reset Password
                </Button>
              </Form>
            )}

            <div className="text-center mt-4">
              <Link href="/partner-login" className="text-sm text-yellow-400 font-medium hover:underline">
                Back to Login
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default VerifyOtpProfessional;
