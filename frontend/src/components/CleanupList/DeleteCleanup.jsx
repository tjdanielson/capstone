import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./CleanupList.css";

const DeleteCleanup = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSave = (event) => {
    setShow(false);
    makeDeleteRequest(event);
  };

  async function makeDeleteRequest(cleanupId) {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/cleanups/${props.cleanupId}/`
      );
      window.location.reload(false);
    } catch (ex) {
      alert("Error. Cleanup not deleted. Please try again.");
    }
  }

  return (
    <>
      <Button className="modal-button" variant="primary" onClick={handleShow}>
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="title">Delete Cleanup?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="save-button"
            variant="primary"
            onClick={handleCloseSave}
          >
            Delete Cleanup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCleanup;
