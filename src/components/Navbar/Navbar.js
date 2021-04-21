import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Logo from "../../assets/icon/Logo.png";
import RH from "../../assets/images/rh.png";
import Search from "../../assets/images/search.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="shadow p-3 mb-5 bg-white sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <div className="row d-flex flex-row justify-content-beetwen">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="logo-brand">
                  <img src={Logo} alt="icon-bareksa" />
                </div>
              </Link>
              <div className="user">
                <div className="image">
                  {/* <img src={RH} alt="RH" className="img-fluid" /> */}
                  <p className="text-name"> RH </p>
                </div>
                <div className="dropdown">
                  {/* <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={{
                        backgroundColor: "white",
                        borderColor: "white",
                        color: "black",
                        width: "120px",
                      }}
                    >
                      Reinhart H.
                    </Dropdown.Toggle>
                    <p>Kemang, Jakarta</p>
                  </Dropdown> */}
                  <div>
                    <p className="name-1">Reinhart H.</p>
                    <p className="name-2">Kemang, Jakarta</p>
                  </div>
                  &#x25bc;
                </div>
              </div>
            </div>
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search text"
                aria-label="Search"
              />
              <img src={Search} alt="/" />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
