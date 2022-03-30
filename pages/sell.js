import React, { useState } from "react";
import baseUrl from "../helpers/baseUrl";
import { parseCookies } from "nookies";
import { Container, Row, Button, Card } from "react-bootstrap";
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { Cart, BagFill, Plus, Dash } from "react-bootstrap-icons";

export default function Sell({ error, products }) {
  // console.log(products)
  const { token } = parseCookies();
  const [cartProduct,setCartProduct] = useState(products)
  const router = useRouter();
  if (!token) {
    return (
      <div>
        <center>
          <h3>Please Login to view your cart</h3>
          <Link href="/login">
            <Button>Signin</Button>
          </Link>
        </center>
      </div>
    );
  }
  const handlerRemove = async (pid) => {
    const res = await fetch(`${baseUrl}/api/sellcart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId: pid,
      }),
    });
    const res2 = await res.json();
    console.log(res2);
    setCartProduct(res2); 
  }
  if (error) {
    alert(error);
    cookie.remove("user");
    cookie.remove("token");
    router.push("/login");
  }
  return (
    <div>
    <Container fluid>
      <Row>
        {cartProduct.map((item) => {
          return (
            <Card style={{ width: "18rem", margin: 7 }} key={item._id}>
              <Card.Img variant="top" src={item.product.mediaUrl} alt="Deal" />
              <Card.Body>
                <Card.Title>{item.product.name}</Card.Title>
                <Card.Text>{item.description}.</Card.Text>
                <Card.Text>Rs.{item.product.price}</Card.Text>
                <hr />
                <Card.Text>Quantity :{item.quantity}</Card.Text>
                <Card.Text>
                  Total Rs. {item.quantity} X {item.product.price} :{" "}
                  <h5>{item.quantity * item.product.price}</h5>
                </Card.Text>
              </Card.Body>

              <Button
                variant="danger"
                style={{ marginRight: 5 }}
                className="mt-2"
                onClick={() => {
                  handlerRemove(item.product._id);
                }}
              >
                Remove
              </Button>
            </Card>
          );
        })}
      </Row>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      props: { products: [] },
    };
  }
  const res = await fetch(`${baseUrl}/api/sellcart`, {
    headers: {
      Authorization: token,
    },
  });
  const products = await res.json();
  if (products.error) {
    return {
      props: { error: products.error },
    };
  }
  console.log("products", products);
  return {
    props: { products },
  };
}
