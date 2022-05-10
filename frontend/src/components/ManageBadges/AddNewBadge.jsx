import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useAuth from "../../hooks/useAuth";

const AddNewBadge = (props) => {
  const [user, token] = useAuth();
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const inputRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSave = (event) => {
    setShow(false);
    handleSumbit(event);
  };

  const [description, setDescription] = useState("");
  const [prereq, setPrereq] = useState("");
  const [image, setImage] = useState("");

  function handleSumbit(event) {
    makePostRequest();
  }

  async function makePostRequest() {
    const fd = new FormData();
    fd.append("description", description);
    fd.append("cleanup_prereq", prereq);
    fd.append("unlocked_image", image);
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/badges/", fd, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        alert("Badge Created");
      }
    } catch (ex) {
      console.log("error");
      alert("Error - Please try again.");
    }
  }

  return (
    <div className="container">
      <>
        <Button className="modal-button" variant="primary" onClick={handleShow}>
          New Badge
        </Button>
        <Modal show={show} onHide={handleClose}>
          <div class="modal-content">
            <Modal.Header closeButton>
              <Modal.Title className="title">Add a New Badge</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="my-form">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      value={description}
                      placeholder="Description"
                      required
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      value={prereq}
                      placeholder="Cleanup Pre-reqs"
                      required
                      onChange={(event) => setPrereq(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      onChange={(event) => setImage(event.target.files[0])}
                      ref={inputRef}
                    />
                  </div>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="save-button"
                variant="primary"
                onClick={handleCloseSave}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default AddNewBadge;
