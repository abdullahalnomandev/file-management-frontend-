"use client";
import { useState } from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
const { TextArea } = Input;

function ContactInfo() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  // Contact cards configuration with static data
  const contactCards = [
    {
      id: 1,
      title: "Email",
      image: "/icons/email.svg", // Placeholder path - replace with actual
      description: '<a href="mailto:info@example.com" class="text-yellow-500 hover:text-yellow-600 no-underline">info@example.com</a>',
    },
    {
      id: 2,
      title: "Phone (WhatsApp)",
      image: "/icons/phone.svg", // Placeholder path - replace with actual
      description: '<div class="text-gray-600">+971 XX XXX XXXX</div>',
    },
    {
      id: 3,
      title: "Opening Hours",
      image: "/icons/clock.svg", // Placeholder path - replace with actual
      description: '<div class="text-gray-600">Monday - Friday</div><div class="text-gray-600">9:00 AM - 5:00 PM</div>',
    },
    {
      id: 4,
      title: "Address",
      image: "/icons/location.svg", // Placeholder path - replace with actual
      description: '<div class="text-gray-600">United Arab Emirates</div>',
    },
  ];

  // Form fields configuration
  const formFields = [
    {
      name: "name",
      label: "Name",
      rules: [
        { required: true, message: "Please enter your name" },
        { min: 2, message: "Name must be at least 2 characters" },
      ],
      input: (
        <Input
          placeholder="Enter your name"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "memberShipId",
      label: "Membership Number",
      rules: [{ message: "Please enter your membership number" }],
      input: (
        <Input
          placeholder="Enter your membership number"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email" },
      ],
      input: (
        <Input placeholder="Enter your email" size="large" className="rounded-md" />
      ),
    },
    {
      name: "contact",
      label: "Phone Number",
      rules: [
        { required: true, message: "Please enter your phone number" },
        { pattern: /^[0-9+\s-()]+$/, message: "Please enter a valid phone number" },
      ],
      input: (
        <Input
          placeholder="Enter your phone number"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "message",
      label: "Message",
      rules: [
        { required: true, message: "Please enter your message" },
        { min: 10, message: "Message must be at least 10 characters" },
      ],
      input: (
        <TextArea
          rows={4}
          placeholder="Enter your message"
          size="large"
          className="rounded-md"
        />
      ),
    },
  ];

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      
      // Show success message
      messageApi.success("Message sent successfully!");
      form.resetFields();
    } catch (error) {
      messageApi.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    messageApi.error("Please fill in all required fields correctly.");
  };

  return (
    <div className="py-16 px-5 max-w-7xl mx-auto">
      {contextHolder}
      <Row gutter={[32, 32]}>
        {/* Left Side - Contact Information */}
        <Col xs={24} md={10}>
          <h2 className="text-2xl text-black font-bold mb-6">
            Get in Touch
          </h2>

          {contactCards.map((card) => (
            <Card
              key={card.id}
              variant="borderless"
              className="shadow-md! rounded-lg! mb-5!"
              style={{ boxShadow: "0px 4px 6px 2px #00000014" }}
            >
              <div className="flex items-center gap-3">
                {/* Icon instead of image (since no API) */}
                <div className="w-10 h-10 flex items-center justify-center">
                  {card.title === "Email" && <MailOutlined className="text-2xl text-blue-500" />}
                  {card.title === "Phone (WhatsApp)" && <PhoneOutlined className="text-2xl text-green-500" />}
                  {card.title === "Opening Hours" && <ClockCircleOutlined className="text-2xl text-yellow-500" />}
                  {card.title === "Address" && <EnvironmentOutlined className="text-2xl text-red-500" />}
                </div>

                <div>
                  <h4 className="font-semibold text-black">
                    {card.title}
                  </h4>

                  {/* Render HTML safely */}
                  <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </Col>

        {/* Right Side - Contact Form */}
        <Col xs={24} md={14}>
          <Card
            className="shadow-md rounded-lg max-w-2xl"
            variant="borderless"
            style={{ boxShadow: "0px 4px 6px 2px #00000014" }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Us Message</h3>

            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              {formFields.map((field) => (
                <Form.Item
                  key={field.name}
                  label={<span className="text-base font-medium">{field.label}</span>}
                  name={field.name}
                >
                  {field.input}
                </Form.Item>
              ))}

              <Form.Item className="text-right">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                  className="h-12 text-base font-medium rounded-md bg-blue-500 hover:bg-blue-600"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ContactInfo;