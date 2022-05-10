import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useAuth from "../../hooks/useAuth";

const SuspendUser = (props) => {
  const [user, token] = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSave = (event) => {
    setShow(false);
    makePatchRequest(event);
  };

  async function makePatchRequest() {
    const fd = new FormData();
    props.user.is_active
      ? fd.append("is_active", false)
      : fd.append("is_active", true);
    try {
      let response = await axios.patch(
        `http://127.0.0.1:8000/api/auth/users/${props.user.id}/`,
        fd,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (ex) {
      alert("Error. Cleanup not deleted. Please try again.");
    }
  }

  return (
    <>
      <Button className="modal-button" variant="primary" onClick={handleShow}>
        {props.user.is_active ? "Suspend" : "Un-Suspend"}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="modal-body">
          {props.user.is_active ? "Suspend User?" : "Un-Suspend User?"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="save-button"
            variant="primary"
            onClick={handleCloseSave}
          >
            {props.user.is_active ? "Suspend User" : "Un-Suspend User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SuspendUser;
