import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "./NavbarTriqui.module.css";

export default function NavbarTriqui() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={styles.colorNav}
        variant="dark"
      >
        <div className={styles.container}>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo.png"
              width="35"
              height="35"
              className="d-inline-block align-top"
            />
            <span className={styles.textBrand}>Triqui</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav activeKey={window.location.pathname} className="ms-auto">
              <Nav.Link className={styles.itemNavbar} href="/">
                Inicio
              </Nav.Link>
              <Nav.Link className={styles.itemNavbar} href="/history">
                Historial
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
}
