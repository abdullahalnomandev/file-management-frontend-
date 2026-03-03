import React from "react";
import { Row, Col, Skeleton } from "antd";

export default function Loading() {
  return (
    <div className="container">
      <h2 style={{ marginBottom: 20 }}>File Manager</h2>
      <Row gutter={[16, 16]}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Col key={idx} xs={24} sm={12} md={8} lg={6}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
        ))}
      </Row>
    </div>
  );
}