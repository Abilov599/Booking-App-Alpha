import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardDataById } from "../../../redux/slice/getCardDataById";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { fetchUserAuth } from "./../../../redux/slice/userAuthSlice";
import axios from "axios";
import { Alert, Modal, Popconfirm } from "antd";

const Booking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { roomID } = useParams();

  const dispatch = useDispatch();

  const { loading, data, error } = useSelector(
    (state) => state.getCardDataById
  );
  const user = useSelector((state) => state.userAuthSlice);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate(`/bookings/${user?.data._id}`);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchCardDataById(roomID));
    dispatch(fetchUserAuth());
  }, [dispatch]);

  const formObj = JSON.parse(sessionStorage.getItem("formObj")) ?? {};

  const totalAmount = formObj?.totalDaysValue * data?.price;

  const bookRoom = async () => {
    const bookingDetails = {
      room: data && data,
      user: user?.data,
      userId: user?.data._id,
      roomId: data?._id,
      checkInDate: formObj?.checkInValue,
      checkOutDate: formObj?.checkOutValue,
      totalDays: formObj?.totalDaysValue,
      totalAmount: totalAmount,
      childCount: formObj?.childrenValue,
      adultCount: formObj?.adultsValue,
      transactionId: data?._id + user?.data?._id,
    };
    try {
      const res = axios.post(
        "http://localhost:8080/api/bookings/",
        bookingDetails
      ).data;
      showModal();
    } catch (error) {
      throw error;
    }
  };
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
  };

  return (
    <main id="booking">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Booking</title>
      </Helmet>
      <section className="slider">
        <Slider {...settings}>
          {data?.images?.map((img, i) => {
            return (
              <div key={i} className="slide">
                <img src={`${img}`} alt="" />
              </div>
            );
          })}
        </Slider>
      </section>
      <Modal
        title="Payment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Alert
          message="Room booked"
          description="Click Ok and go to My Bookings"
          type="success"
          showIcon
        />
      </Modal>
      <section className="main-info">
        <div className="container">
          <div className="box">
            <div className="image">
              <img src={`${data?.thumbnailImage}`} alt="" />
            </div>
            <div className="content">
              <div className="for-rent">For Rent</div>
              <h1>
                {data?.type}
                <span>
                  {`$${data?.price}.99`}
                  <span>/Night</span>
                </span>
              </h1>
              <div className="facilities">
                <ul>
                  <li>
                    <i className="fa-solid fa-bed"></i>Beds
                  </li>
                  <li>
                    <i className="fa-solid fa-snowflake"></i>AC
                  </li>
                  <li>
                    <i className="fa-solid fa-tv"></i>TV
                  </li>
                  <li>
                    <i className="fa-solid fa-dumbbell"></i>GYM
                  </li>
                  <li>
                    <i className="fa-solid fa-wifi"></i>Wi-Fi
                  </li>
                  <li>
                    <i className="fa-solid fa-square-parking"></i>Parking
                  </li>
                </ul>
              </div>
              <p>
                <Link to="#">
                  <i className="fa-solid fa-location-dot"></i>
                  {data?.address}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="room-details">
        <div className="container">
          <div className="room-about">
            <div className="description">
              <h3>Description</h3>
              <p>{data?.description}</p>
            </div>
            <div className="extra-service">
              <h3>Extra Service</h3>
              <div className="extra-service-item">
                <p>Air Conditioner </p>
                <div className="border-center"></div>
                <div className="label-items-value">
                  <span className="price">+24$</span>to price per person
                </div>
              </div>
              <div className="extra-service-item">
                <p>Free Internet </p>
                <div className="border-center"></div>
                <div className="label-items-value">
                  <span className="price">+14$</span>to price per person
                </div>
              </div>
              <div className="extra-service-item">
                <p>LCD Television </p>
                <div className="border-center"></div>
                <div className="label-items-value">
                  <span className="price">+15$</span>to price per person
                </div>
              </div>
              <div className="extra-service-item">
                <p>Microwave </p>
                <div className="border-center"></div>
                <div className="label-items-value">
                  <span className="price">+30$</span>to price per person
                </div>
              </div>
            </div>
          </div>
          <div className="payment">
            <div className="box">
              <h3>Payment</h3>
              <div className="prices">
                <div className="prices-item">
                  <p>Check in Date: </p>
                  <div className="border-center"></div>
                  <div className="label-items-value">
                    {formObj?.checkInValue}
                  </div>
                </div>
                <div className="prices-item">
                  <p>Check Out Date: </p>
                  <div className="border-center"></div>
                  <div className="label-items-value">
                    {formObj?.checkOutValue}
                  </div>
                </div>
                <div className="prices-item">
                  <p>Total Days: </p>
                  <div className="border-center"></div>
                  <div className="label-items-value">
                    {`${formObj?.totalDaysValue} days`}
                  </div>
                </div>
                <hr />
                <div className="prices-item total">
                  <p>Total Amount: </p>
                  <div className="border-center"></div>
                  <div className="label-items-value">
                    {formObj?.totalDaysValue} x {`$${data?.price}`} =
                    {`$${totalAmount}`}
                  </div>
                </div>
              </div>
              <Popconfirm
                placement="bottom"
                title={"Payment confirmation"}
                description={"Are You Sure?"}
                onConfirm={bookRoom}
                okText="Yes"
                cancelText="No"
              >
                <button>Pay Now</button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Booking;
