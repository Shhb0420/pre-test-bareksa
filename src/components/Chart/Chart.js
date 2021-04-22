import React, { useEffect, useState } from "react";
import "./Chart.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Doughnut, Pie, Line, Bar } from "react-chartjs-2";
import { API_URL } from "../../utils/environment";
import axios from "axios";
import { NavItem } from "react-bootstrap";
import parseISOWithOptions from "date-fns/fp/parseISOWithOptions/index";

const Chart = () => {
  const [order, setOrder] = useState();
  const [item, setItem] = useState([]);
  const [revenue, setRevenue] = useState();
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState([]);

  const handleSelect = () => {
    alert("hiya");
  };
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(API_URL)
      .then((res) => {
        const data = res.data.data.orders;
        let items = {};
        res.data.data.orders.forEach((item) => {
          if (!item.conversion_item) return; // exit (maybe add them to a "no_make" category)

          if (!items[item.conversion_item])
            items[item.conversion_item] = [Number(item.conversion_revenue)];
          else
            items[item.conversion_item].push(Number(item.conversion_revenue));
        });

        const users = res.data.data.orders
          .filter((item) => item.status)
          .map((item) => {
            return item.status;
          })
          .reduce((list, status) => {
            if (list[status]) {
              list[status] = list[status] + 1;
            } else {
              list[status] = 1;
            }
            return list;
          }, []);

        // console.log(users);

        // console.log(
        //   Object.values(items)
        //     .map((arr) => arr.reduce((sum, item) => (sum += item), 0))
        //     .toLocaleString("en-US", {
        //       style: "currency",
        //       currency: "USD",
        //     })
        // );
        setOrder(data);
        setItem(Object.keys(items));
        setRevenue(
          Object.values(items).map((arr) =>
            arr.reduce((sum, item) => (sum += item), 0)
          )
        );
        setUser(Object.keys(users));
        setStatus(Object.values(users));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dataForecastPie = {
    labels: item,
    datasets: [
      {
        data: revenue,
        backgroundColor: ["#725E9C", "#E4EAEB", "#EBA45E", "#5C8F94"],
        hoverBackgroundColor: ["#725E9C", "#E4EAEB", "#EBA45E", "#5C8F94"],
        hoverOffset: 4,
      },
    ],
  };

  const dataUsercastPie = {
    labels: user,
    datasets: [
      {
        data: status,
        backgroundColor: ["#725E9C", "#E4EAEB", "#EBA45E", "#5C8F94"],
        hoverBackgroundColor: ["#725E9C", "#E4EAEB", "#EBA45E", "#5C8F94"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <div className="d-flex">
        <div className="conversion">
          <div className="d-flex justify-content-between">
            <p>Conversion</p>
            <p>...</p>
          </div>
          {/* <Doughnut /> */}
          <div style={{ height: 300, alignContent: "center", marginTop: 25 }}>
            <Pie
              width={350}
              height={150}
              options={{
                maintainAspectRatio: false,
                legend: {
                  display: true,
                  position: "bottom",
                  fontSize: 10,
                  boxWidth: 5,
                  padding: 25,
                },
              }}
              data={dataForecastPie}
            />
          </div>
        </div>
        <div className="conversion">
          <div className="d-flex justify-content-between">
            <p>Users</p>
            <p>...</p>
          </div>
          <div style={{ height: 300, alignContent: "center", marginTop: 25 }}>
            <Pie
              width={350}
              height={150}
              options={{
                maintainAspectRatio: false,
                legend: {
                  display: true,
                  position: "bottom",
                  fontSize: 10,
                },
              }}
              data={dataUsercastPie}
            />
          </div>
        </div>
        <div className="revenue">
          <div className="d-flex justify-content-between">
            <p>Revenue</p>
            <p>...</p>
          </div>
        </div>
      </div>

      <div className="d-flex" style={{ marginBottom: "15px" }}>
        <div className="dateRange">
          <DateRange onChange={handleSelect} ranges={[selectionRange]} />
        </div>
        <div className="table-orders">
          <p style={{ marginTop: "15px" }}>Orders</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Order Number</th>
                <th scope="col">Status</th>
                <th scope="col">Operator</th>
                <th scope="col">Location</th>
                <th scope="col">Start Date</th>
                <th scope="col">Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>21 April 2021</td>
                <td>21 April 2021</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>21 April 2021</td>
                <td>21 April 2021</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>21 April 2021</td>
                <td>21 April 2021</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Chart;
