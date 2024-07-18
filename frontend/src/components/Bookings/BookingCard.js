import React, { useState } from "react";

import { Button, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CANCEL_BOOKING } from "../../graphql/Mutations";
import { useMutation } from "@apollo/client";
const BookingCard = ({ booking, afterCancelHandler }) => {
  const [showDetails, setShowDetails] = useState(false);

  const [cancelBooking, { loading, error }] = useMutation(CANCEL_BOOKING);

  const cancelBookingHandler = async (bookingID) => {
    try {
      const { data } = await cancelBooking({
        variables: { bookingID: bookingID },
      });
      if (afterCancelHandler) {
        afterCancelHandler({ ...data?.cancelBooking, bookingID });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="mt-3">
      <Card.Header className="font-weight-bolder">
        {booking.event.title} :-{" "}
        {new Date(booking.event.date).toLocaleDateString()}
      </Card.Header>
      {showDetails && (
        <Card.Body>
          <Card.Subtitle className="text-monospace">
            {booking.event.description}
          </Card.Subtitle>
          <Card.Text>
            <i class="bi bi-person"></i> {booking.user.email}
            <br />
            <i class="bi bi-wallet"></i> ${booking.event.price}
            <br />
            <i class="bi bi-calendar3"></i>{" "}
            {new Date(booking.event.date).toLocaleDateString()}
          </Card.Text>{" "}
          <Button
            variant="danger"
            onClick={() => cancelBookingHandler(booking._id)}
          >
            Cancel booking
          </Button>
        </Card.Body>
      )}
      <Card.Footer
        className="text-center"
        style={{ cursor: "pointer" }}
        onClick={() => setShowDetails(!showDetails)}
      >
        View Details{" "}
        <i class={`bi bi-chevron-${showDetails ? "up" : "down"}`}></i>
      </Card.Footer>
    </Card>
  );
};

export default BookingCard;
