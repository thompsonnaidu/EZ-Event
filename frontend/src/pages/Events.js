import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_EVENTS } from "../graphql/Queries";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner,Button,Card } from "react-bootstrap";
import EventCard from "../components/Events/EventCard";
import { useAuth } from "../context/auth/authContext";
import CreateEventModal from "../components/Events/CreateEventModal/CreateEventModal";

const Events = () => {
  const [getEvents,{ loading, data }] = useLazyQuery(GET_EVENTS);
  const [eventInfos, setEventInfos] = useState([]);
  const { authData } = useAuth();

  const [show,setShow]= useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    //fetch all event on load
  useEffect(() => {
    getEvents();
    
  },[]);

  useEffect(() => {
    setEventInfos(data?.events);
  }, [data]);


  const handleAfterEventSave= (events)=>{

    let newEvents= [...eventInfos];
    newEvents.push(events);
    
    setEventInfos(newEvents);  
    setShow(false);
    
  }

  return (
    <div className="mx-2 mt-5">
      {authData.isAuthenticated && (
        <Card className="d-flex justify-content-center align-items-center">
            <Card.Body>
                <h5 className="font-weight-bolder">Share your events</h5>
                <Button className="primary btn-md block" onClick={handleShow}>Create New Events</Button>
            </Card.Body>
        </Card>
      )}
    
      <h3 className="text-center mt-2">List of Events</h3>
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner
            className="text-center"
            animation="border"
            variant="primary"
          />
          <span className="text-center mx-2">Fetching events </span>
        </div>
      )}
      <CreateEventModal handleClose={handleClose} afterSaveHandler={handleAfterEventSave} handleShow={handleShow} show={show}/>
      <div className="pt-6 d-flex flex-row flex-wrap">
        {eventInfos?.map((event) => {
          return <EventCard event={event} key={event._id} />;
        })}

        {!loading && eventInfos?.length === 0 && (
          <div className="text-center">No events Available</div>
        )}
      </div>
    </div>
  );
};

export default Events;
