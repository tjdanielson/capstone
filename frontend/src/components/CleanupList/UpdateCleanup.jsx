import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useAuth from "../../hooks/useAuth";

const UpdateCleanup = (props) => {
  const [user, token] = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSave = (event) => {
    setShow(false);
    handleSumbit(event);
  };

  const [date, setDate] = useState(props.cleanup.date_cleanup);
  const [beforeImg, setBeforeImg] = useState(props.cleanup.beforeImg);
  const [afterImg, setAfterImg] = useState(props.cleanup.afterImg);
  const [street, setStreet] = useState(props.cleanup.street);
  const [city, setCity] = useState(props.cleanup.city);
  const [state, setState] = useState(props.cleanup.state);
  const [zip, setZip] = useState(props.cleanup.zip);
  const [lat, setLat] = useState(props.cleanup.latitude);
  const [lng, setLng] = useState(props.cleanup.longitude);

  function handleSumbit(event) {
    event.preventDefault();
    let updatedCleanup = {
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
    if (street && city && state) {
      getCoordinates(updatedCleanup);
    } else {
      makePostRequest(updatedCleanup);
    }
    console.log("updated cleanup:", updatedCleanup);
  }

  async function getCoordinates(updatedCleanup) {
    try {
      let response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${city}+${state}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      let data = response.data;
      setLat(data.results[0].geometry.location.lat);
      setLng(data.results[0].geometry.location.lng);
      makePostRequest(updatedCleanup);
    } catch (ex) {
      console.log("error");
    }
  }

  async function makePostRequest(updatedCleanup) {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/cleanups/${props.cleanup.id}/`,
        updatedCleanup,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        window.location.reload();
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
          View/Update
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{`Cleanup ${props.cleanup.id}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="summary">
              <div className="before">
                <h4>Before Image</h4>
                <img
                  src={
                    props.cleanup.before_img
                      ? `http://127.0.0.1:8000${props.cleanup.before_img}`
                      : `http://127.0.0.1:8000/media/noimageavailable.png`
                  }
                  alt="after"
                />
              </div>
              <div className="after">
                <h4>After Image</h4>
                <img
                  src={
                    props.cleanup.after_img
                      ? `http://127.0.0.1:8000${props.cleanup.after_img}`
                      : `http://127.0.0.1:8000/media/noimageavailable.png`
                  }
                  alt="after"
                />
              </div>
            </div>
            <div className="my-form">
              <form>
                <h4>Update Cleanup Info</h4>
                <div className="form-group">
                  <label>Date of Cleanup</label>
                  <input
                    type="date"
                    value={date}
                    placeholder="Date of Cleanup"
                    required
                    onChange={(event) => setDate(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Before Image</label>
                  <input
                    type="file"
                    value={beforeImg}
                    placeholder="Before Image"
                    onChange={(event) => setBeforeImg(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>After Image</label>
                  <input
                    type="file"
                    value={afterImg}
                    text="After Image"
                    onChange={(event) => setAfterImg(event.target.value)}
                  />
                </div>
                <p>Address</p>
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

export default UpdateCleanup;
