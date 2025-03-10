import React, { useState, useEffect, act } from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { message, Table } from "antd";
import { axiosInstance } from "../../helpers/axiosInstance";
import moment from "moment";

function AdminUsers() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/users/get-all-users", {});
      dispatch(HideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const updateUserPermissions = async (user, action) => {
    try {
      let payload = null
      if (action === "make-admin") {
        payload = {
          ...user,
          isAdmin: true,
        };
      } else if (action === "remove-admin") {
        payload = {
          ...user,
          isAdmin: false,
        };
      } else if (action === "block-user") {
        payload = {
          ...user,
          isBlocked: true,
        };
      } else if (action === "unblock-user") {
        payload = {
          ...user,
          isBlocked: false,
        };
      }
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/users/update-user-permissions",
        payload
      );
      dispatch(HideLoading());
      if (response.data.success) {
        getUsers();
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "",
      render: (data) => {
        if (data?.isAdmin) {
          return "Admin";
        } else {
          return "User";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          {record?.isBlocked && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "unblock")}
            >
              Unblock
            </p>
          )}
          {!record?.isBlocked && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "block")}
            >
              Block
            </p>
          )}
          {record?.isAdmin && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "remove-admin")}
            >
              Relieve Admin Privileges
            </p>
          )}
          {!record?.isAdmin && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "make-admin")}
            >
              Grant Admin Privileges
            </p>
          )}
          {/* <p className="underline">Delete</p> */}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Users" />
      </div>

      <Table columns={columns} dataSource={users} />
    </div>
  );
}

export default AdminUsers;
