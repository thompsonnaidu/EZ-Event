import React,{ useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../../../context/auth/authContext";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "../../../graphql/Mutations";
import { Alert } from "react-bootstrap";

const CreateEventModal = ({handleClose,handleShow,show,afterSaveHandler
}) => {

    const titleRef = useRef("");
    const priceRef = useRef("");
    const dateRef = useRef("");
    const descriptionRef = useRef("");
    const {authData}= useAuth();

    const [createEvent,{data,loading,error}]= useMutation(CREATE_EVENT);

    

    const saveEventHandler = async (event) =>{
        event.preventDefault();
        const title= titleRef.current.value;
        const price= parseFloat(priceRef.current.value);
        const date= dateRef.current.value;
        const userId= authData.userId;
        const description= descriptionRef.current.value;
        try {
           const {data}= await createEvent({variables:{
                event:{
                    title,
                    description,
                    price,
                    date,
                    creator:userId
                }
            }});
            if(afterSaveHandler){
                afterSaveHandler({...data.createEvent});
            }
        } catch (error) {
            console.error(error,"while saving events");
        }
    }

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          {error && <Alert variant="danger" className="mt-3">Error Creating Events:  {
              error.networkError?.result?.errors.map(({message},index)=><span key={index}>{message}</span>)
              }</Alert>}
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Event Name"
                ref={titleRef}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="price"
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="20.00"
                ref={priceRef}
                min={0}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="date"
            >
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="mm/dd/yyyy"
                ref={dateRef}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="date"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                row={3}
                ref={descriptionRef}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={loading} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={saveEventHandler} disabled={loading}>
            Create Events
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateEventModal;
