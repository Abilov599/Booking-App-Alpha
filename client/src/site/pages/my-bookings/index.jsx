import { Button, message, Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookingsByUserId } from "../../../redux/slice/getBookingsByUserId";
import "./index.scss";

const MyBookings = () => {
  const btnRef = useRef();
  const { userID } = useParams();
  const { loading, data, error } = useSelector(
    (state) => state.getBookingsByUserId
  );

  const dispatch = useDispatch();

  const confirm = async (bookingId, roomId) => {
    try {
      await axios.post("http://localhost:8080/api/cancel-booking", {
        bookingId,
        roomId,
      }).data;
      btnRef.current.disabled = true;
      message.success("Booking Canceled");
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchBookingsByUserId(userID));
  }, [dispatch]);

  const columns = [
    {
      title: "Room Image",
      dataIndex: "room",
      render: (room) => (
        <img style={{ width: "200px" }} src={room.thumbnailImage} alt="" />
      ),
    },
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Room Type",
      dataIndex: "room",
      render: (room) => <p>{room.type}</p>,
    },
    {
      title: "Check in Date",
      dataIndex: "checkInDate",
    },
    {
      title: "Check Out Date",
      dataIndex: "checkOutDate",
    },
    {
      title: "Total Days",
      dataIndex: "totalDays",
    },
    {
      title: "Adults",
      dataIndex: "adultCount",
    },
    {
      title: "Children",
      dataIndex: "childCount",
    },
    {
      title: "Booked at",
      dataIndex: "createdAt",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (price) => <p>{`${price}$`}</p>,
    },
    {
      title: "Cancel Booking",
      render: (booking) => {
        return booking?.status === "booked" ? (
          <Popconfirm
            placement="bottomRight"
            title={"Are you sure?"}
            description={"Are you sure to cancel booking?"}
            onConfirm={() => confirm(booking._id, booking.roomId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" ref={btnRef} danger>
              Cancel
            </Button>
          </Popconfirm>
        ) : (
          <Button type="primary" danger disabled>
            Canceled
          </Button>
        );
      },
    },
  ];

  return (
    <main id="my-bookings">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Bookings</title>
      </Helmet>
      {data?.length > 0 ? (
        data?.map((bookings, i) => {
          const booking = [bookings];
          return (
            <Table
              key={i}
              rowKey="_id"
              dataSource={booking}
              columns={columns}
              pagination={false}
            />
          );
        })
      ) : (
        <Table dataSource={data} columns={columns} pagination={false} />
      )}
    </main>
  );
};

export default MyBookings;
