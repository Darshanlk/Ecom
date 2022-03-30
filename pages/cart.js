import React, { useState, useEffect } from "react";
import baseUrl from "../helpers/baseUrl";
import { parseCookies } from "nookies";
import { Container, Row, Button, Card, Modal } from "react-bootstrap";
import Link from "next/link";
import cookie from "js-cookie";
import { Cart, BagFill, Plus, Dash } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import StripeCheckout from "react-stripe-checkout";
export default function UserCart({ error, products }) {

  const router = useRouter();
  const { token } = parseCookies();
  console.log(token)
  const [cartProduct, setCartProduct] = useState(products);
  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  

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
  let price = 0;
  const handlerRemove = async (pid) => {
    const res = await fetch(`${baseUrl}/api/cart`, {
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
    //give updated cart
    console.log(res2);
    setCartProduct(res2); //response ma updateCart aave te useState thi update thay jay
  };

  if (error) {
    alert(error);
    // console.log(error);
    cookie.remove("user");
    cookie.remove("token");
    router.push("/login");
  }

  const handleCheckout = async (paymentInfo) => {
    console.log(paymentInfo);
    const res = await fetch(`${baseUrl}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        paymentInfo,
      }),
    });
    const res2 = await res.json();
    console.log(res2);

    setShow1(true);
  };
  //create Cart Items component to show component

  return (
    <div>
      <Container fluid>
        <Row>
          {cartProduct.map((item) => {
            price = price + item.quantity * item.product.price;
            return (
              <Card style={{ width: "18rem", margin: 7 }} key={item._id}>
                <Card.Img
                  variant="top"
                  src={item.product.mediaUrl}
                  alt="Deal"
                />
                <Card.Body>
                  <Card.Title>{item.product.name}</Card.Title>
                  <Card.Text>{item.description}.</Card.Text>
                  <Card.Text>Rs.{item.product.price}</Card.Text>
                  <hr />
                  <Card.Text>Quantity :{item.quantity}</Card.Text>
                  <Card.Text>
                    Total Rs. {item.quantity} X {item.product.price} :{" "}
                    <h5> ₹ {item.quantity * item.product.price} </h5>
                  </Card.Text>
                </Card.Body>

                <Button
                  variant="primary"
                  style={{ marginRight: 5 }}
                  className="mt-3 "
                >
                  {products.length != 0 && (
                    <StripeCheckout
                      name="My store"
                      amount={price * 100}
                      image={
                        products.length > 0 ? products[0].product.mediaUrl : ""
                      }
                      currency="INR"
                      shippingAddress={true}
                      billingAddress={true}
                      zipCode={true}
                      stripeKey="pk_test_51KhVSaSGT0OJ26ngzJaAJdeEpHXLee6nD069Oy6LHQHH4L6k2vvwFmhkCmZVNzgmHNlz3sJVnhGDvPgLHS1IVbi4007y3Xd67S"
                      token={(paymentInfo) => handleCheckout(paymentInfo)}
                    >
                      Buy
                    </StripeCheckout>
                  )}
                </Button>

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

          <hr className="my-3" />
          <div>
            <h3>Total Price : ₹ {price} </h3>
          </div>
          <hr className="my-3" />
          {products.length != 0 && (
            <StripeCheckout
              name="My store"
              amount={price * 100}
              image={products.length > 0 ? products[0].product.mediaUrl : ""}
              currency="INR"
              shippingAddress={true}
              billingAddress={true}
              zipCode={true}
              stripeKey="pk_test_51KhVSaSGT0OJ26ngzJaAJdeEpHXLee6nD069Oy6LHQHH4L6k2vvwFmhkCmZVNzgmHNlz3sJVnhGDvPgLHS1IVbi4007y3Xd67S"
              token={(paymentInfo) => handleCheckout(paymentInfo)}
            >
              <Button varient="success">Checkout</Button>
            </StripeCheckout>
          )}
        </Row>
      </Container>
      <>
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title varient="success">Congratulation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Payment SucessFull</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={(e) => {
                handleClose1( )
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { token } = parseCookies(context);

//   if (!token)
//   {
//       return {
//         props:{products:[]}
//       }
//   }
//   const res = await fetch(`${baseUrl}/api/cart`, {
//     headers: {
//       "Authorization":token
//     },
//   });
//   const products =await res.json();
//   if(products.error)
//   {
//     return{
//       props:{error:products.error}
//     }
//   }
//    console.log("products",products)
//   return {
//     props:{products},
//   }
// }

//-------------------------------------------//
export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      props: { products: [] },
    };
  }
  const res = await fetch(`${baseUrl}/api/cart`, {
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
