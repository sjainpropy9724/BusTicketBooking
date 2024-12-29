import React from "react";
import { Col, Form, Modal, Row } from "antd";
import { useDispatch } from "react-redux";
function BusForm({ showBusForm, setShowBusForm, type='add' }) {
    const dispatch = useDispatch();
    const onFinish = async(values) => {
        try {
            let response = null;
                if(type === 'add') {
                    response = await axios.post
                }
        } catch (error) {

        }
    }
    return (
    <Modal
      width={800}
      title="Add Bus"
      open={showBusForm}
      onCancel={() => setShowBusForm(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Row>
          <Col lg={12} xs={24}>
            <Form.Item label="Bus Name" name="name">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col lg={12} xs={12}>
            <Form.Item label="Bus Number" name="number">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={12}>
            <Form.Item label="Capacity" name="capacity">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col lg={12} xs={12}>
            <Form.Item label="Origin" name="from">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={12}>
            <Form.Item label="Destination" name="to">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col lg={8} xs={8}>
            <Form.Item label="Journey Date" name="jounreyDate">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={8}>
            <Form.Item label="Departure" name="departure">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={8}>
            <Form.Item label="Arrival" name="arrival">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col lg={12} xs={12}>
            <Form.Item label="Type" name="type">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={12}>
            <Form.Item label="Fare" name="fare">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-dlex justify-content-end">
            <button className="secondary-btn" type="submit">Submit</button>
        </div>
      </Form>
    </Modal>
  );
}

export default BusForm;
