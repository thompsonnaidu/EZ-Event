import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKINGS } from "../graphql/Queries";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner,Button,Card } from "react-bootstrap";
import { useAuth } from "../context/auth/authContext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import BookingCard from "../components/Bookings/BookingCard";
const Bookings = () => {

  const {loading,error,data}= useQuery(GET_BOOKINGS);
  const [bookingInfos,setBookingInfos]= useState([]);
  const {authData}= useAuth();
  

  useEffect(()=>{
    setBookingInfos(data?.bookings);
  },[data]);

  const handleAfterCancel = (bookingInfo)=>{
    let newBookings= bookingInfos.filter(booking=>booking._id!==bookingInfo.bookingID);
    setBookingInfos(newBookings);
  }
  return (
    <div className="mx-2 mt-5">
       <h3 className="text-center mt-2">List of Bookings</h3>
       {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner
            className="text-center"
            animation="border"
            variant="primary"
          />
          <span className="text-center mx-2">Fetching Bookings </span>
        </div>
      )}

      <div className="pt-6 d-flex flex-column">
        {
          bookingInfos && bookingInfos.map((booking,index)=>(
            <BookingCard key={index} booking={booking} afterCancelHandler={handleAfterCancel}>
              
            </BookingCard>
        ))}
       {bookingInfos?.length===0 && <h4 className="text-center">No bookings found</h4>}
      </div>
    </div>
  )
}

export default Bookings