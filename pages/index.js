import React from "react";
import Link from "next/link";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { Cart, BagFill, Plus, Dash } from "react-bootstrap-icons";
// import img1  from '../public/images/GUCCI.jpg'
// import  baseUrl from '../'

export default function Home({ products }) {
  






  // console.log(products);
  return (
    <div>
      <Container fluid>
        <Row>
          <Carousel className="my-3">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src='/images/GUCCI.jpg'
                alt="First slide"
                width="500"
                height="500"
              />
              <Carousel.Caption>
                <h3>Top Brands </h3>
                <p>Over 1000 shops connectivity.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/nike.jpg"
                alt="Second slide"
                width="500"
                height="500"
              />

              <Carousel.Caption>
                <h3>Fashions</h3>
                <p>Nike,Addidas,Puma and all Top fasion Brands</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/LOGITECH.jpg"
                alt="Third slide"
                width="500"
                height="500"
              />

              <Carousel.Caption>
                {/* <h3>Electronics</h3>
                <p>Computer Parts,Hardware and Computer appliance</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row>
          {products.map((item) => {
            return (
              <Card style={{ width: "16rem", margin: 7 }} key={item._id}>
                <Card.Img
                  variant="top"
                  src={item.mediaUrl}
                  style={{ padding: 20 }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  
                  <Card.Text>{item.description}.</Card.Text>
                </Card.Body>
                <div>
                <Card.Body>
                    {" "}
                    <Card.Text>Rs.{item.price}</Card.Text>
                  </Card.Body>
                </div>
                
              

                <Link href={"/product/[id]"} as={`/product/${item._id}`}>
                  
                  <Button
                    variant="primary"
                    style={{ marginRight: 5 }}
                    className="my-3"
                  >
                    Buy <BagFill size={18} />
                  </Button>
                </Link>
              </Card>
            );
          })}
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

//  export async function getStaticProps() {
//    const res = await fetch(`http://localhost:3000/api/products`);

//   const data = await res.json();

//    return {
//     props: {
//       products: data,
//     },
//   };
// }
export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/products`);

  const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
}

// export async function getStaticProps(context) {
//   const res = await fetch("http://localhost:3000/api/products");

//   const data = await res.json();

//   return {
//     props: { message: data.message },
//   };
// }

/**
 
  <Style jsx>
  {
    `
    h1{
      color:"red";
    }
    `
  }

  //getStaticProps work   in  server side only

  // we have two options for data fetching

  //1. getStaticProps -- it use when our page is not user Sepcific // public  page home page of eom
  // it is prebuild <Home> it is  made on buit time //user req kare  te pela . j apge aavi jay 
  //and jem user select kare tem fatak thi page open thai jay
  //2. getServerSideprops --// it is use for user specific like add to cart ,user profile page
  // jyare aatle user req kare web per server res ma page khule so time ley.
  //profile  page ,add to cart,ext...





 */

//
