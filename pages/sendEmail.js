import React, { useState } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
// import EmailFunction  from '../helpers/EmailSender'

export default function sendEmail() {
  

  return (
    <div>
      <Container>
        <center>
          <Col md={6} xs={12}>
            <Form.Label htmlFor="inputPassword5">Email</Form.Label>
            <Form.Control
              type="email"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Enter Your Email"
              onChange={(e) => console.log('click')}
            />
          </Col>
          <Button  className="m-3">
            Submit
          </Button>
        </center>
      </Container>
    </div>
  );
}
