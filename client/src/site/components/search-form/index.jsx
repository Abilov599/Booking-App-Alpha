import React, { useEffect, useState } from "react";
import "./index.scss";
import { DatePicker, message, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardData } from "../../../redux/slice/getCardDataSlice";

const SearchForm = () => {
  const duplicateData = useSelector((state) => state.getCardData.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardData());
  }, [dispatch]);

  let today = new Date();
  let date = today.toJSON().slice(0, 10);
  let nDate =
    date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);

  const navigate = useNavigate();
  const [checkInValue, setCheckInValue] = useState(nDate);
  const [checkOutValue, setCheckOutValue] = useState(nDate);
  const [roomValue, setRoomValue] = useState("Single Room");
  const [adultsValue, setAdultsValue] = useState(1);
  const [childrenValue, setChildrenValue] = useState(0);

  const { pathname } = useLocation();

  const dateFormatList = "DD-MM-YYYY";

  const totalDaysValue = () => {
    if (
      moment
        .duration(
          moment(checkOutValue, dateFormatList).diff(
            moment(checkInValue, dateFormatList)
          )
        )
        .asDays() === 0
    ) {
      return 1;
    }
    if (
      moment
        .duration(
          moment(checkOutValue, dateFormatList).diff(
            moment(checkInValue, dateFormatList)
          )
        )
        .asDays() > 0
    ) {
      return moment
        .duration(
          moment(checkOutValue, dateFormatList).diff(
            moment(checkInValue, dateFormatList)
          )
        )
        .asDays();
    } else {
      return moment
        .duration(
          moment(checkInValue, dateFormatList).diff(
            moment(checkOutValue, dateFormatList)
          )
        )
        .asDays();
    }
  };

  const obj = {
    checkInValue: checkInValue,
    checkOutValue: checkOutValue,
    roomValue: roomValue,
    adultsValue: adultsValue,
    childrenValue: childrenValue,
    totalDaysValue: totalDaysValue(),
  };

  const checkInDate = moment(checkInValue, dateFormatList);
  const checkOutDate = moment(checkOutValue, dateFormatList);

  const filterByDates = () => {
    let tempRooms = [],
      availability = false;
    for (const room of duplicateData) {
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          if (
            !checkInDate.isBetween(
              moment(booking.checkInDate, dateFormatList),
              moment(booking.checkOutDate, dateFormatList)
            ) &&
            !checkOutDate.isBetween(
              moment(booking.checkInDate, dateFormatList),
              moment(booking.checkOutDate, dateFormatList)
            )
          ) {
            if (
              checkInValue !== booking.checkInDate &&
              checkInValue !== booking.checkOutDate &&
              checkOutValue !== booking.checkInDate &&
              checkOutValue !== booking.checkOutDate
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability === true || room.currentBookings.length === 0) {
        tempRooms.push(room);
      }
      dispatch(fetchCardData(tempRooms));
      availability = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkInValue &&
      checkOutValue &&
      sessionStorage.setItem("formObj", JSON.stringify(obj));
    filterByDates();
    message.success("Rooms are filtered successfully!");
    if (pathname === "/") {
      navigate("/rooms");
    }
  };

  return (
    <div className="search-room">
      <form action="" method="get" onSubmit={(e) => handleSubmit(e)}>
        <h4>
          Search Your <span>Rooms</span>
        </h4>
        <div className="form-group">
          <DatePicker
            onChange={(_date, dateString) => {
              setCheckInValue(dateString);
              dispatch(fetchCardData());
            }}
            placeholder="Check In"
            format={dateFormatList}
          />
        </div>
        <div className="form-group">
          <DatePicker
            onChange={(_date, dateString) => {
              setCheckOutValue(dateString);
            }}
            placeholder="Check Out"
            format={dateFormatList}
          />
        </div>
        <div className="form-group">
          <Select
            placeholder="Rooms"
            onChange={(value) => {
              setRoomValue(value);
            }}
            options={[
              { value: "Single Room", label: "Single Room" },
              { value: "Double Room", label: "Double Room" },
              { value: "Deluxe Room", label: "Deluxe Room" },
              { value: "Super Deluxe Room", label: "Super Deluxe Room" },
            ]}
          />
        </div>
        <div className="form-group">
          <Select
            placeholder="Adults"
            onChange={(value) => {
              setAdultsValue(value);
            }}
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
            ]}
          />
        </div>
        <div className="form-group">
          <Select
            placeholder="Children"
            onChange={(value) => {
              setChildrenValue(value);
            }}
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
            ]}
          />
        </div>
        <div className="form-group">
          <button type="submit">
            {pathname === "/rooms" ? "Confirm" : "Search"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
