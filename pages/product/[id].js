import React, { useState } from "react";
import { useRouter } from "next/router";
// import { Spinner } from "react-bootstrap";
import baseUrl from "../../helpers/baseUrl";
import nookies from "nookies";


import { Cart, BagFill, Plus, Dash } from "react-bootstrap-icons";

import {
  Container,
  Row,
  Card,
  Col,
  InputGroup,
  FormControl,
  ButtonGroup,
  Form,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import { parseCookies } from "nookies";
import Link from "next/link";
// import Example from "../../Components/Example";

export default function Product({ product }) {
  const router = useRouter();
  const [item, setItem] = useState(1);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const handleClose1 = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const cookie = parseCookies();
  // const user = cookie.user ? JSON.parse(JSON.stringify(cookie.user)) : "";
  const cookies = nookies.get();
  console.log(cookies.username, cookies.email, cookies.role);
  const userType = cookies.role;
  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });


    // const data = await  res.json();

    router.push("/");
  };

  const handleCheckout = async (paymentInfo) => {
    console.log(paymentInfo);
    const res = await fetch(`${baseUrl}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({
        paymentInfo,
        productId: product._id,
      }),
    });
    const res2 = await res.json();
    console.log(res2);

    // setShow1(true);
  };

  if (router.isFallback == true) {
    return <h3>Loading...</h3>;
  }

  const AddToCart = async () => {
    handleShow2();
    //this is update request
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({
        quantity: item,
        productId: product._id,
      }),
    });

    const res2 = await res.json();

    if (res2.error) {
      cookie.remove("user");
      cookie.remove("token");
      router.push("/login");
    }

    console.log(res2);
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <Card className="py-5">
            <Row style={{ backgroundColor: "" }}>
              <Col xs={12} md={5} style={{}}>
                <Card.Img variant="top" src={product.mediaUrl} />
              </Col>
              <Col xs={12} md={7} style={{}}>
                <h3 className="mx-auto">{product.name}</h3>
                <Card.Text
                  style={{
                    fontWeight: "normal",
                    fontFamily: "revert",
                    color: "#a6a2a2",
                    fontSize: 20,
                  }}
                >
                  {product.description}
                </Card.Text>
                <hr />

                <h4>Rs.{product.price}</h4>
                <hr />
                <Col md={3} xs={7}>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">Item</InputGroup.Text>
                    <FormControl
                      placeholder="0"
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                    />
                    <Button
                      variant="success"
                      value={item}
                      onClick={(e) => setItem(++item)}
                    >
                      <Plus size={18} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => (item == "1" ? "" : setItem(--item))}
                    >
                      <Dash size={18} />
                    </Button>
                  </InputGroup>
                </Col>
                <hr />
                <Col xs={12} md={6}>
                  {userType == "admin" && (
                    <Button variant="danger" onClick={handleShow}>
                      Delete
                    </Button>
                  )}
                  
                    {/* <Button onClick={handleShow1} className="mx-3">
                      <BagFill size={18} /> Buy
                    </Button> */}
                    <Button className="mx-3" onClick={() => {AddToCart(); router.push('/cart')}}>
                      <BagFill size={18} /> Buy
                    </Button>
                  {userType ? (
                    <Button varient="info" onClick={AddToCart}>
                      {" "}
                      Add <Cart size={18} />{" "}
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>

                <hr />
                {product.productBy}
                <Card.Body>
                  <h3>Payment</h3>
                  <h4>Total Price: {item * product.price}</h4>
                  <hr />

                  <h3 className="my-3">Payment</h3>

                  <Row>
                    <Col>
                      <Form.Check
                        name="groupOptions"
                        type={"radio"}
                        label={"Cash on Delivery (COD) "}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        
                        name="groupOptions"
                        type={"radio"}
                        label={"Wallet"}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        defaultChecked
                        name="groupOptions"
                        type={"radio"}
                        label={"Card"}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Row>
      </Container>
      {/* For model ---> item delete button for admin user */}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title varient="danger">Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure,to delete this item.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={(e) => {
                handleClose;
                deleteProduct();
              }}
            >
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <>
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title varient="success">Congratulation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure,to Buy this item.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={(e) => {
                handleClose1()
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <>
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title varient="success">Congratulation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Product,added in cart</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={(e) => {
                handleClose2();
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

// // so we used
// // we destructure context which is given by  context and further we destructure id
// export async function getServerSideProps({params:{id}}) {
//    const res = await fetch(`http://localhost:3000/api/product/${id}`)
//    const data = await res.json()
//     return {
//       props: {product:data}, // will be passed to the page component as props
//     }
//   }

// for getStaticProps we provide getStaticPath
export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();
  return {
    props: { product: data },
  };
}

export async function getStaticPaths() {
  //so main logic is we fetch all id from  server and pass  in params. this is not a good approch it is depand upon website-Type
  return {
    paths: [
      { params: { id: "6234495fae4fde4b29024628" } }, // aapde NExt js ne kevu pade ke kaya page mate preBuid  rakhi muke
    ],
    // fallback: false, // false or 'blocking'
    fallback: true, // means aapde je id or je product ne jova mate click karsu te fetch thase so it may take littlebit time.

    //fallback is false means  aapde je id aapi tej product nu page pre loaded hoy
  };
}

//lunch model
// export async function getServerSideProps({ params: { id } }) {
//   const res = await fetch(`${baseUrl}/api/product/${id}`);
//   const data = await res.json();
//   return {
//     props: { product: data },
//   };
// }

// export async function getStaticPaths() {
//   //so main logic is we fetch all id from  server and pass  in params. this is not a good approch it is depand upon website-Type
//   return {
//     paths: [
//       { params: { id: "6234495fae4fde4b29024628" } }, // aapde NExt js ne kevu pade ke kaya page mate preBuid  rakhi muke
//     ],
//     // fallback: false, // false or 'blocking'
//     fallback: true, // means aapde je id or je product ne jova mate click karsu te fetch thase so it may take littlebit time.

//     //fallback is false means  aapde je id aapi tej product nu page pre loaded hoy
//   };
// }

