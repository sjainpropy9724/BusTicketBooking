import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, message, Row } from "antd";
import Bus from "../components/Bus";
import axios from "axios";

function Home() {
  const { user } = useSelector((state) => state.users);
  const [filters = {}, setFilters] = useState({});
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const getBuses = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(ShowLoading());
      const API_BASE_URL = "https://busticketbooking-93vx.onrender.com";
      const response = await axios.post(
        `${API_BASE_URL}/api/buses/get-all-buses`,
        Object.keys(tempFilters).length ? tempFilters : {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    setFilters({});
    getBuses();
  }, []);

  return (
    <div>
      <div className="my-3 px-2 py-1">
        <Row gutter={10} align="center">
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="From"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="To"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="date"
              placeholder="Journey Date"
              value={filters.journeyDate}
              onChange={(e) =>
                setFilters({ ...filters, journeyDate: e.target.value })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getBuses()}>
                Filter
              </button>
              <button
                className="outlined px-3"
                onClick={() => {
                  setFilters({ from: "", to: "", journeyDate: "" }); // Reset fields properly
                  getBuses(); // Ensure API is called only after filters are reset
                }}
              >
                Clear Filters
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ padding: "20px" }}>
        <Row gutter={[24, 24]}>
          {buses
            .filter((bus) => bus.status === "Yet to Start")
            .map((bus) => (
              <Col lg={8} xs={24} sm={24} key={bus._id}>
                <div className="bus-card">
                  <Bus bus={bus} />
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
