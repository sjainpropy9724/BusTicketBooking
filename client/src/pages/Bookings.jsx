import React, { useState, useEffect, useRef } from "react";
import PageTitle from "../components/PageTitle";
import BusForm from "../components/BusForm";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { message, Modal, Table } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import moment from "moment";
import { IndianRupee } from "lucide-react";
import { useReactToPrint } from "react-to-print";

function Bookings() {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/get-bookings-by-user-id",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
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
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const journeyDate = moment(record.journeyDate);
        const daysDifference = journeyDate.diff(moment(), "days");
        const isCancellable = daysDifference >= 3;

        return (
          <div className="flex gap-4">
            <p
              className="text-md underline cursor-pointer"
              onClick={() => {
                setSelectedBooking(record);
                setShowPrintModal(true);
              }}
            >
              Print Ticket
            </p>
            <p
              className={`text-md underline ${
                isCancellable ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={
                isCancellable
                  ? () => {
                      setSelectedBooking(record);
                      setShowCancelModal(true);
                    }
                  : null
              } // Prevents click if not cancellable
            >
              Cancel Ticket
            </p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `My Ticket`,
    onAfterPrint: () => console.log("Printing completed"),
  });

  return (
    <div>
      <PageTitle title="Bookings" />
      <div className="mt-2">
        <Table dataSource={bookings} columns={columns} />
      </div>
      {/* Print Ticket Modal */}
      {showPrintModal && (
        <Modal
          title="Print Ticket"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          open={showPrintModal}
          okText="Print"
          onOk={handlePrint}
        >
          <div className="d-flex flex-column p-5" ref={componentRef}>
            <p className="text-md">{selectedBooking.name}</p>
            <p className="text-md text-secondary">
              {selectedBooking.from} - {selectedBooking.to}
            </p>
            <hr />
            <p>
              <span className="text-md" style={{ color: "#808080" }}>
                Journey Date:
              </span>{" "}
              <span className="text-md">
                {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
              </span>{" "}
            </p>
            <p>
              <span className="text-md" style={{ color: "#808080" }}>
                Journey Time:
              </span>{" "}
              <span className="text-md">{selectedBooking.departure}</span>
            </p>
            <hr />
            <p>
              <span className="text-lg" style={{ color: "#808080" }}>
                Seat Numbers:
              </span>{" "}
              <br />
              <span className="text-md">{selectedBooking.seats}</span>
            </p>
            <hr />
            <p>
              <span className="text-md" style={{ color: "#808080" }}>
                Total Amount:
              </span>{" "}
              <br />
              <span className="text-md">
                <IndianRupee />
                {selectedBooking.fare * selectedBooking.seats.length} /-
              </span>
            </p>
            <hr />
            <p>
              <span className="text-sm" style={{ color: "#808080" }}>
                Booking Created on:{" "}
              </span>{" "}
              <br />
              <span className="text-sm">
                {moment(selectedBooking.createdAt).format(
                  "DD-MM-YYYY HH:mm:ss"
                )}
              </span>
            </p>
            <p>
              <span className="text-sm" style={{ color: "#808080" }}>
                Transaction ID:
              </span>{" "}
              <br />
              <span className="text-sm">{selectedBooking.transactionId}</span>
            </p>
          </div>
        </Modal>
      )}
      {/* Cancel Ticket Modal */}
      {showCancelModal && (
        <Modal
          title="Cancel Ticket"
          onCancel={() => {
            setShowCancelModal(false);
            setSelectedBooking(null);
          }}
          open={showCancelModal}
          okText="OK"
        >
          <div className="d-flex flex-column p-5">
            <p>
              <span className="text-md" style={{ color: "#808080" }}>
                Booking ID:
              </span>{" "}
              <span className="text-sm">{selectedBooking._id}</span>
            </p>
            <p>
              <span className="text-md" style={{ color: "#808080" }}>
                Booking Amount:
              </span>{" "}
              <br />
              <span className="text-md">
                <IndianRupee />{" "}
                {selectedBooking.fare * selectedBooking.seats.length} /-
              </span>
            </p>
            <p>
              <span className="text-md" style={{ color: "#808080" }}>
                Booked Seats:
              </span>{" "}
              <span className="text-md">
                {selectedBooking.seats.join(", ")}
              </span>
            </p>
            <p>
              <span className="text-md" style={{ color: "#808080" }}>
                Time of Booking:
              </span>{" "}
              <span className="text-sm">
                {moment(selectedBooking.createdAt).format(
                  "DD-MM-YYYY HH:mm:ss"
                )}
              </span>
            </p>
            <p>
              <span className="text-md" style={{ color: "#808080" }}>
                Current Date of Cancellation:
              </span>{" "}
              <span className="text-sm">
                {moment().format("DD-MM-YYYY HH:mm:ss")}
              </span>
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Bookings;
