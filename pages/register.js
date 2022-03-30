import Link from "next/link";
import React, { useState } from "react";
import { Col, Container, Form, Button, Row, Alert } from "react-bootstrap";
import baseUrl from "../helpers/baseUrl";
import Lottie from "react-lottie";
import anim1 from '../helpers/lotties/anim1.json'
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks  
  const [show, setShow] = useState();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData:anim1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = formData.username;
    const email = formData.email;
    const password = formData.password;
    const firstname = formData.firstname;
    const lastname = formData.lastname;
    const mobilenumber1 = formData.mobilenumber1;
    const mobilenumber2 = formData.mobilenumber2;
    const city = formData.city;
    const state = formData.state;
    const country = formData.country;
    const pincode = formData.pincode;
    const address = formData.address;

 
    const res = await fetch(`${baseUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        firstname,
        lastname,
        mobilenumber1,
        mobilenumber2,
        city,
        state,
        country,
        pincode,
        address,
      }),
    });


    const data = await res.json();
    if (data.error) {
      setShow(
        <Alert variant="danger" dismissible>
          <h4>{data.error}</h4>
        </Alert>
      );
    } 
   else if(data.message) {
    setShow(
      <Alert variant="sucess" dismissible>
        <h4>{data.message}</h4>
      </Alert>
    )
    router.push('/login')
    
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            {show}
            <Form onSubmit={handleSubmit}>
              <center className="m-5">
                <h3>SignUp</h3>
              </center>

              <Row>
                <Col xs={12} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email Id"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Username"
                      name="username"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your FirstName"
                      name="firstname"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Lastname"
                      name="lastname"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Mobile Number 1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Mobile Number 1"
                      name="mobilenumber1"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Mobile Number 2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Mobile Number 2"
                      name="mobilenumber2"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={3}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      name="city"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      name="state"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Country"
                      name="country"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>PinCode</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Pincode"
                      name="pincode"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Your Address"
                  name="address"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col xs={12} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Confirm Password"
                      name="confirmpassword"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <h6>
                    Already have an account ?{" "}
                    <Link href="/login" passHref>
                      Signin
                    </Link>{" "}
                  </h6>
                </Col>
              </Row>
              <center>
                <Button variant="primary" className="m-3" type="submit">
                  Submit
                </Button>
              </center>
              <hr />
            </Form>
          </Col>
          <Col xs={12} md={6}>


          <Lottie options={defaultOptions} height={400} width={400} />
          </Col>
        </Row>
      </Container>
      <footer style={{ background: "black", height: 50 }} xs={12} md={12}>
        <p style={{ color: "white" }}>© 2022 Copyright: Lk@Darshan.All rights reserved</p>
      </footer>
    </div>

  );
}
