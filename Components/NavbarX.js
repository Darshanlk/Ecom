// import React from "react";
import Link from "next/link";
import {  
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Form,
  FormControl,
} from "react-bootstrap";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import cookie from "js-cookie";

export default function NavbarX() {
  // if user have token then user-logged in else user not logged in
  const usercookie = parseCookies()
  console.log(usercookie)
  //  const user =  cookieuser.user ? JSON.parse(cookieuser.user) : ""
  let user = false;
  const router = useRouter();
  const { token } = parseCookies();

  if (token) {
    user = true;
  } else {
    user = false;
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link href="/" passHref>
          <Navbar.Brand href="/">Deal</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* ans */}
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>

            {/* ans */}

            {user ? (
              <>
                <NavDropdown title="Account" id="navbarScrollingDropdown">
                  <Link href="/login" passHref>
                    <NavDropdown.Item href="#action3">SignIn</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <Link href="/register" passHref>
                    <NavDropdown.Item href="#action4">SignUp</NavDropdown.Item>
                  </Link>
                
                  <NavDropdown.Divider />
                  <Link href="/profile" passHref>
                    <NavDropdown.Item href="#action5">Profile</NavDropdown.Item>
                  </Link>
                </NavDropdown>
                <Link href="/sell" passHref>
                  <Nav.Link>Sell Cart</Nav.Link>
                </Link>
                <Link href="/create" passHref>
                  <Nav.Link>Sell Item</Nav.Link>
                </Link>
                <Link href="/cart" passHref>
                  <Nav.Link>Cart</Nav.Link>
                </Link>
                {/* <Button  variant="danger">SignOut</Button> */}
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Nav.Link>Signin</Nav.Link>
                </Link>
                <Link href="/register" passHref>
                  <Nav.Link>Signup</Nav.Link>
                </Link>
              </>
            )}
          </Nav>

          { user ?


          <Button
            variant="danger"
            onClick={() => {
              cookie.remove("token");
              router.push("/login");
            }}
          >
            SignOut
          </Button>:
          ""

          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
