import React, { useState } from "react";
import { Col, Container, Form, Button, Alert } from "react-bootstrap";
import baseUrl from "../helpers/baseUrl";
import { parseCookies } from "nookies";
// import privateFunction from "../helpers/privateFunction";
export default function Create() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [media, setMedia] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, setShow] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  var error;
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(JSON.stringify(cookie.user)) : "";
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData,media);

    const name = formData.name;
    const price = formData.price;
    const description = formData.details;
    // console.log(formData.name, formData.price);

    const mediaUrl = await imageUpload();

    //product going to home page public
    const res = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         
      },

      body: JSON.stringify({
        name,
        price,
        description,
        mediaUrl,
      }),
    });
    setShow(true);
    const res2 = await res.json();
    console.log(res2)

    let productId =  res2.product._id
    
    error = res2.error;

    const resNew = await fetch(`${baseUrl}/api/sellcart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization:cookie.token
      },

      body: JSON.stringify({
        qunantity:1,
        productId,
      }),
    });
    const resNew2 = await resNew.json();
    console.log(resNew2)
  };

   

  //upload image in  cloudnary
  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "ecomStore");
    data.append("cloud_name", `dv2itymkq`);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dv2itymkq/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    console.log(res2.url);
    return res2.url;
  };

  return (
    <div>
      <Container className="h-100">
        <Col md={5} xs={12}>
          <center>
            <h3 className="m-5">Sell Product</h3>
          </center>
          {show && error ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>Check all details and fill all the fields</p>
            </Alert>
          ) : show && !error ? (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Your Product added successfully</Alert.Heading>
              <p>please check sale item stack</p>
            </Alert>
          ) : (
            ""
          )}
          <form className="mt-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Product Name"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Detils</Form.Label>
              <Form.Control
                as="textarea"
                name="details"
                rows={3}
                placeholder="Enter Your product Details"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select Images</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                // value={media}
                onChange={(e) => setMedia(e.target.files[0])}
                required
              />
              {/* show the image after uploading it */}
              <img
                className="img-fluid"
                src={media ? URL.createObjectURL(media) : ""}
              ></img>
            </Form.Group>
            <Col xs={12} md={3}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  onChange={handleChange}
                  name="price"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </form>
        </Col>
      </Container>
      <footer style={{ background: "black", height: 50 }} xs={12} md={12}>
        <p style={{ color: "white" }}>
          © 2022 Copyright: Lk@Darshan.All rights reserved
        </p>
      </footer>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const cookie = parseCookies(context);

//   // const user = cookie.user ? JSON.parse(cookie.user): " ";
//   const user = cookie.user ? parseCookies(cookie.user): " ";

//   if (user.role == "admin") {
//     const { res } = context;
//     res.writeHead(200, { Location: "/admin" });
//     res.end();
//   }

//   privateFunction(context);

//   return {
//     props: {},
//   };
// }

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx);
  // console.log(JSON.parse(JSON.stringify(cookie.user)));
  const user = cookie.user ? JSON.parse(JSON.stringify(cookie.user)) : "";
  if (user.role == "user" || user.role == "") {
    const { res } = ctx;
    res.writeHead(302, { Location: "/" });
    res.end();
  }

  return {
    props: {},
  };
}
