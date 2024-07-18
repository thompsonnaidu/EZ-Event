import React, { useState } from 'react'
import { useAuth } from '../../context/auth/authContext';
import { Card, Button, Alert} from "react-bootstrap";
import { useMutation } from '@apollo/client';
import { BOOK_EVENT } from '../../graphql/Mutations';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const EventCard = ({event}) =>{
    const {authData}= useAuth();
    let creatorEmail= event.creator.email;
    let showBookingButton=true;
    const [showSuccess,setShowSuccess]=useState(false);
    if(event.creator._id===authData?.userId){
        creatorEmail="You";
        showBookingButton=false;
    }

    const [bookEvent,{data,loading,error}] =useMutation(BOOK_EVENT);

    const registerHandler= async (eventID) =>{

       try {
        const {data}= await bookEvent({variables:{
            eventId:eventID,
            userId:authData?.userId
        }});
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false),2000);
        
       } catch (error) {
            console.error(error);
       }

    }

    return (
    <Card bg="light" className="col-xs-12 col-sm-6 col-md-3 m-2">
      <Card.Body>
        {showSuccess && <Alert variant="success">Registered successfully</Alert>}
        <Card.Title>{event.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
        <i class="bi bi-info-circle"></i> {event.description}
        <hr/>
        </Card.Subtitle>
        <Card.Text>
        
        <i class="bi bi-person"></i> {creatorEmail}
        <br/>
        <i class="bi bi-wallet"></i> ${event.price}
          <br />
          <i class="bi bi-calendar3"></i> {new Date(event.date).toLocaleDateString()}
        </Card.Text>
        
        {showBookingButton && <Button  onClick={()=>registerHandler(event._id)} disabled={loading} variant="success">{loading?"Registering....":"Register"}</Button>}
      </Card.Body>
    </Card>);
  }

export default EventCard