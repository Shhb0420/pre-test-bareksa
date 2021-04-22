import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Logo from "../../assets/icon/Logo.png";
import Lonceng from "../../assets/icon/lonceng.png";
import Pengaturan from "../../assets/icon/icon.png";
import Search from "../../assets/images/search.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="p-3 bg-white sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          {/* <div className="container"> */}
          <div className="row d-flex flex-row justify-content-beetwen">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="logo-brand">
                <img src={Logo} alt="icon-bareksa" />
              </div>
            </Link>
            <div className="user">
              <div className="image">
                <p className="text-name"> RH </p>
              </div>
              <div className="dropdown">
                <p className="name-1">Reinhart H.</p>
                <p className="name-2">Kemang, Jakarta</p>
                <div className="toggle-drop">&#x25bc;</div>
              </div>
            </div>
          </div>
          <div className="row d-flex flex-row align-items-center justify-content-end">
            <div className="searching">
              <Form>
                <Form.Group
                  controlId="formSearch"
                  className="dashboard-search d-flex flex-row align-items-center rounded-lg"
                >
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Search text"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Form.Label className="m-0">
                      <img
                        src={Search}
                        alt="icon"
                        style={{ marginRight: "5px" }}
                      />
                    </Form.Label>
                  </div>
                </Form.Group>
              </Form>
            </div>
            <div className="lonceng">
              <img src={Lonceng} alt="lonceng" />
            </div>
            <div className="pengaturan">
              <img src={Pengaturan} alt="pengaturan" />
            </div>
          </div>
        </nav>
      </div>

      {/* Tanggal */}
      <div className="getDate d-flex justify-content-end">
        <p className="dateNow">
          {new Date().toLocaleString("id-ID", {
            day: "numeric",
            year: "numeric",
            month: "long",
          })}
        </p>
      </div>
    </>
  );
};

export default Navbar;
