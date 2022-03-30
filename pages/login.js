import Link from "next/link";
import React, { useState } from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import baseUrl from "../helpers/baseUrl";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import anim1 from "../helpers/lotties/anim1.json";
import Demo from "../helpers/Demo";
export default function Login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, setShow] = useState();
  var error;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: anim1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email;
    const password = formData.password;

    const res = await fetch(`${baseUrl}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    setShow(true);

    const data = await res.json();
    // console.log(data.error);
    error = await data.error;

    if (data.error) {
      setShow(
        <Alert variant="danger" dismissible>
          <h4>{data.error}</h4>
        </Alert>
      );
    } else {
      //set cookie for sucesser
      cookie.set("token", data.token);
      cookie.set("username", data.username);
      cookie.set("email", data.email);
      cookie.set("role", data.role);
      // cookie.set("id",data._id)

      router.push("/");
    }

    // console.log(formData);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={3}>
            {show}
            <Form className="mt-5" onSubmit={handleSubmit}>
              <center>
                <h3>Signin</h3>
              </center>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter username"
                  onChange={handleChange}
                  // onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Row>
                <h6>
                  Do not have an account?{" "}
                  <Link href="/register" passHref>
                    SignUp
                  </Link>{" "}
                </h6>
              </Row>
              <Row>
                <h6>
                  <Link href="/sendEmail" passHref>
                    Forgot password?
                  </Link>{" "}
                </h6>
              </Row>
              <center>
                <Button variant="primary" className="m-3" type="submit">
                  Submit
                </Button>
              </center>
            </Form>
          </Col>
          <Col xs={12} md={6}>
            <Lottie options={defaultOptions} height={400} width={400} />
          </Col>
        </Row>
      </Container>
      <footer
        style={{
          background: "black",
          height: 50,
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
        }}
        xs={12}
        md={12}
      >
        <p style={{ color: "white" }}>
          © 2022 Copyright: Lk@Darshan.All rights reserved
        </p>
      </footer>
    </div>
  );
}
