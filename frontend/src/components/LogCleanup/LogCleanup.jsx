import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useAuth from "../../hooks/useAuth";

const LogCleanup = (props) => {
  const [user, token] = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSave = (event) => {
    setShow(false);
    handleSumbit(event);
  };

  const [date, setDate] = useState("");
  const [beforeImg, setBeforeImg] = useState(null);
  const [afterImg, setAfterImg] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  function handleSumbit(event) {
    event.preventDefault();
    let newCleanup = {
      date_cleanup: date,
      before_img: beforeImg,
      after_img: afterImg,
      street: street,
      city: city,
      state: state,
      zip: zip,
      latitude: lat,
      longitude: lng,
    };
    setDate("");
    setBeforeImg("");
    setAfterImg("");
    setStreet("");
    setCity("");
    setState("");
    setZip("");
    makePostRequest(newCleanup);
  }

  async function makePostRequest(newCleanup) {
    try {
      let response = await axios.post(
        "http://127.0.0.1:8000/api/cleanups/",
        newCleanup,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
      }
    } catch (ex) {
      console.log("error");
      alert(
        "Error - Please try again. Make sure you fill in all song details!"
      );
    }
  }

  return (
    <div>
      <>
        <Button className="modal-button" variant="primary" onClick={handleShow}>
          Log a Cleanup
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Log a Cleanup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="my-form">
              <form>
                <div className="form-group">
                  <input
                    type="date"
                    value={date}
                    placeholder="Date of Cleanup"
                    required
                    onChange={(event) => setDate(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    value={beforeImg}
                    placeholder="Before Image"
                    onChange={(event) => setBeforeImg(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    value={afterImg}
                    placeholder="After Image"
                    onChange={(event) => setAfterImg(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Street"
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Zip"
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                  />
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default LogCleanup;
