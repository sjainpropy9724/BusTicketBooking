import React, { useState, useEffect, useRef } from "react";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { message, Modal, Table } from "antd";
import { axiosInstance } from "../../helpers/axiosInstance";
import moment from "moment";
import { IndianRupee } from "lucide-react";
import { useReactToPrint } from "react-to-print";

function AdminBookings() {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/get-all-bookings",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => ({
          ...booking,
          ...booking.bus,
          key: booking._id,
        }));
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    { title: "Bus Name", dataIndex: "name", key: "bus" },
    { title: "Bus Number", dataIndex: "number", key: "bus" },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    { title: "Journey Time", dataIndex: "departure" },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => seats.join(", "),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            Print Ticket
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={() => {
              setSelectedBooking(record);
              setShowCancelModal(true);
            }}
          >
            Cancel Ticket
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Bus Ticket",
  });

  return (
    <div>
      <PageTitle title="Bookings" />
      <div className="mt-2">
        <Table
          dataSource={bookings}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </div>

      {/* Print Ticket Modal */}
      <Modal
        title="Ticket Details"
        visible={showPrintModal}
        onCancel={() => setShowPrintModal(false)}
        footer={[
          <button key="print" className="btn-primary" onClick={handlePrint}>
            Print
          </button>,
        ]}
      >
        <div ref={componentRef} className="p-4 space-y-3">
          <h2 className="text-xl font-bold">{selectedBooking?.name}</h2>
          <p className="text-lg text-gray-600">
            {selectedBooking?.from} → {selectedBooking?.to}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500">Journey Date:</label>
              <p>
                {moment(selectedBooking?.journeyDate).format("DD MMM YYYY")}
              </p>
            </div>
            <div>
              <label className="text-gray-500">Departure Time:</label>
              <p>{selectedBooking?.departure}</p>
            </div>
          </div>
          <p className="text-lg">
            <IndianRupee className="inline mr-1" />
            {selectedBooking?.fare * selectedBooking?.seats?.length} INR
          </p>
        </div>
      </Modal>

      {/* Cancel Ticket Modal */}
      <Modal
        title="Confirm Ticket Cancellation"
        visible={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        footer={[
          <button
            key="cancel"
            className="btn-danger"
            onClick={() => {
              message.success("Cancellation request received");
              setShowCancelModal(false);
            }}
          >
            Confirm Cancellation
          </button>,
        ]}
      >
        {selectedBooking && (
          <div className="space-y-3">
            <p>
              <strong>Booking ID:</strong> {selectedBooking._id}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹
              {selectedBooking.fare * selectedBooking.seats.length}
            </p>
            <p>
              <strong>Seats:</strong> {selectedBooking.seats.join(", ")}
            </p>
            <p>
              <strong>Booked On:</strong>{" "}
              {moment(selectedBooking.createdAt).format("DD MMM YYYY, hh:mm A")}
            </p>
            <p className="text-red-500">
              <strong>Cancellation Time:</strong>{" "}
              {moment().format("DD MMM YYYY, hh:mm A")}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminBookings;
