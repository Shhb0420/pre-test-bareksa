import React, { useEffect, useState } from "react";
import "./Chart.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Polar, Pie, Line } from "react-chartjs-2";
import { API_URL } from "../../utils/environment";
import axios from "axios";

const Chart = () => {
  const [order, setOrder] = useState([]);
  const [item, setItem] = useState([]);
  const [revenue, setRevenue] = useState();
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState([]);
  const [day, setDay] = useState([]);
  const [data, setData] = useState([]);
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

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
        // .map((arr) => arr.reduce((sum, item) => (sum += item), 0))
        // .toLocaleString("en-US", {
        //   style: "currency",
        //   currency: "USD",
        // })
        // );

        const date = data
          .filter((item) => item.start_date)
          .map((item) => new Date(item.start_date))
          .toLocaleString("en-US", {
            weekday: "short",
          })
          .split(",")
          .reduce((list, day) => {
            if (list[day]) {
              list[day] = list[day] + 1;
            } else {
              list[day] = 1;
            }
            return list;
          }, []);

        const dataRevenue = data
          .filter((item) => item.conversion_revenue)
          .map((item) => Number(item.conversion_revenue));

        setOrder(dataRevenue);
        setItem(Object.keys(items));
        setRevenue(
          Object.values(items).map((arr) =>
            arr.reduce((sum, item) => (sum += item), 0)
          )
        );
        setUser(Object.keys(users));
        setStatus(Object.values(users));
        setDay(Object.keys(date));
        setData(data);
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

  const dataForecastLine = {
    labels: day,
    datasets: [
      {
        label: "",
        fill: "-2",
        lineTension: 0.1,
        backgroundColor: "#789764",
        borderColor: "#789764",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#789764",
        pointBackgroundColor: "#ce6300",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#ff7b00",
        pointHoverBorderColor: "#ce6300",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: order,
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
            <Polar
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
          <div style={{ height: 300, alignContent: "center", marginTop: 25 }}>
            <Line
              width={50}
              height={50}
              options={{
                maintainAspectRatio: false,
                legend: {
                  display: false,
                  position: "bottom",
                },
              }}
              data={dataForecastLine}
            />
            <p className="text-total">Total Revenue</p>
            <p className="jumlah-revenue">
              {order
                .reduce((sum, item) => (sum += item), 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex" style={{ marginBottom: "15px" }}>
        <div className="dateRange">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setSelectionRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={selectionRange}
          />
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
              {data.map((item) => {
                return (
                  <tr>
                    <th scope="row">{item.order_id}</th>
                    <td>
                      <div
                        style={{
                          backgroundColor:
                            item.status === "completed"
                              ? "#789764"
                              : item.status === "pending"
                              ? "#E59849"
                              : "#D66D4B",
                          color: "white",
                          width: 90,
                          textAlign: "center",
                          borderRadius: 5,
                        }}
                      >
                        {item.status}
                      </div>
                    </td>
                    <td>{item.full_name}</td>
                    <td>{item.location}</td>
                    <td>
                      {new Date(item.start_date).toLocaleString("id-ID", {
                        day: "numeric",
                        year: "numeric",
                        month: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </td>
                    <td>
                      {new Date(item.due_date).toLocaleString("id-ID", {
                        day: "numeric",
                        year: "numeric",
                        month: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Chart;
