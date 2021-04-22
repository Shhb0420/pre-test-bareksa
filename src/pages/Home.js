import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import Chart from "../components/Chart/Chart";

export default class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Chart />
      </>
    );
  }
}
