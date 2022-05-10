import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useAuth from "../../hooks/useAuth";

const UpdateBadge = (props) => {
  const [user, token] = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSave = (event) => {
    setShow(false);
    handleSumbit(event);
  };

  const [description, setDescription] = useState(props.badge.description);
  const [prereq, setPrereq] = useState(props.badge.cleanup_prereq);
  const [image, setImage] = useState("");

  function handleSumbit(event) {
    makePutRequest();
  }

  async function makePutRequest() {
    const fd = new FormData();
    fd.append("description", description);
    fd.append("cleanup_prereq", prereq);
    if (image) {
      fd.append("unlocked_image", image);
    }

    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/badges/${props.badge.id}/`,
        fd,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("put request response:", response.data);
        alert(`Badge updated`);
      }
    } catch (ex) {
      console.log("error");
      alert("Error - Please try again.");
    }
  }
  return (
    <div>
      <>
        <Button className="modal-button" variant="primary" onClick={handleShow}>
          Update Badge
        </Button>
        <Modal dialogClassName="update-modal" show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="summary">
              <div className="before">
                <h4>Image</h4>
                <img
                  src={
                    props.badge.unlocked_image
                      ? `http://127.0.0.1:8000${props.badge.unlocked_image}`
                      : `http://127.0.0.1:8000/media/noimageavailable.png`
                  }
                  alt="badge"
                />
              </div>
            </div>
            <div className="my-form">
              <form>
                <div className="form-flex-container">
                  <div className="basic-info-container">
                    <div className="form-group">
                      <label>Description</label>
                      <input
                        type="text"
                        value={description}
                        placeholder="Description"
                        required
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Cleanup Pre-req</label>
                      <input
                        type="number"
                        value={prereq}
                        placeholder="Cleanup pre-req"
                        required
                        onChange={(event) => setPrereq(event.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Image</label>
                      <input
                        type="file"
                        onChange={(event) => setImage(event.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              className="save-button"
              variant="primary"
              onClick={handleCloseSave}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default UpdateBadge;
