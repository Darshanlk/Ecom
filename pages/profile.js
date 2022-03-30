import { parseCookies } from "nookies";
import baseUrl from "../helpers/baseUrl";
import { useEffect, useRef } from "react";
import { Container, Card, Row, Col, Button, NavItem } from "react-bootstrap";
import UserRoles from '../Components/UserRoles'
const Profile = ({ orders }) => {
  const orderCard = useRef(null);
  const cookie = parseCookies();
  // const user = cookie.user ? JSON.parse(cookie.user): ""
  console.log(cookie.username);
  console.log(cookie.email);

  useEffect(() => {
    orderCard.current;
  }, []);
  console.log(orders);

  return (
    <>
      <Container>
        <center>
          <h1>Profile</h1>
          <hr />
          <h3>Hello {cookie.username}</h3>
        </center>
        <Row className="mt-5">
          {orders.map((items) => {
            return (
              <> 
                <h5 className="mt-5">Date&Time : {items.createdAt} </h5>
                
                <Card style={{ width: "30rem" }}>
                {items.products.map((pitem) => {

                  return (
                    <>  

                      
                        <Row>
                          <Col md={6} xs={12}>
                          <Card.Img variant="top" src={pitem.product.mediaUrl} />
                          </Col>
                          <Col md={6} xs={12}>
                          <Card.Body>
                            <Card.Title>{pitem.product.name}</Card.Title>
                            <Card.Text>Quantity: {pitem.quantity}</Card.Text>
                            <Card.Text>Rs. {pitem.product.price}</Card.Text>
                            {/* <Card.Text>Date:{}</Card.Text>   */}

                          
                          </Card.Body>
                          </Col>
                          
                        </Row>
                    
                    </>
                  );
                })}
                </Card>
              </>
            );
            
          })}
        </Row>
      </Container>
      <>
     { cookie.role == "admin"? <UserRoles/> : "" }
      </>
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
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  const res = await fetch(`${baseUrl}/api/order`, {
    headers: {
      Authorization: token,
    },
  });
  const res2 = await res.json();
  console.log(res2);

  return {
    props: { orders: res2 },
  };
}

export default Profile;
