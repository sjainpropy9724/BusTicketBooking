import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, message, Row } from "antd";
import Bus from "../components/Bus";

function Home() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-all-buses", {});
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
    getBuses();
  }, []);

  return (
    <div>
      <div></div>
      <div style={{ padding: "20px" }}>
        <Row gutter={[24, 24]}>
          {buses.map((bus) => (
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
