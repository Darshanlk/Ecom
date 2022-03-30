import React from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";

export default function passwordChange() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <footer style={{ background: "black", height: 50 }} xs={12} md={12}>
        <p style={{ color: "white" }}>
          © 2022 Copyright: Lk@Darshan.All rights reserved
        </p>
      </footer>
    </div>
  );
}
