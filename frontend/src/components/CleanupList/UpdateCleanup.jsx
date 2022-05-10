import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useAuth from "../../hooks/useAuth";
import "./CleanupList.css";

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
  const [time, setTime] = useState(props.cleanup.time_spent);
  const [beforeImg, setBeforeImg] = useState(props.cleanup.beforeImg);
  const [afterImg, setAfterImg] = useState(props.cleanup.afterImg);
  const [street, setStreet] = useState(props.cleanup.street);
  const [city, setCity] = useState(props.cleanup.city);
  const [state, setState] = useState(props.cleanup.state);
  const [zip, setZip] = useState(props.cleanup.zip);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    if (lat && lng) {
      let coordinates = {
        latitude: lat.toFixed(7),
        longitude: lng.toFixed(7),
      };
      makePatchRequest(coordinates);
    }
  }, [lat, lng]);

  function handleSumbit(event) {
    event.preventDefault();
    if (street && city && state) {
      getCoordinates();
    }
    makePutRequest();
  }

  async function getCoordinates() {
    try {
      let response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${city}+${state}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      let data = response.data;
      setLat(data.results[0].geometry.location.lat);
      setLng(data.results[0].geometry.location.lng);
    } catch (ex) {
      console.log("error");
    }
  }

  async function makePutRequest() {
    const fd = new FormData();
    fd.append("date_cleanup", date);
    fd.append("time_spent", time);
    if (beforeImg) {
      fd.append("before_img", beforeImg);
    }
    if (afterImg) {
      fd.append("after_img", afterImg);
    }
    if (street) {
      fd.append("street", street);
    }
    if (city) {
      fd.append("city", city);
    }
    if (state) {
      fd.append("state", state);
    }
    if (zip) {
      fd.append("zip", zip);
    }
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/cleanups/${props.cleanup.id}/`,
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
      }
    } catch (ex) {
      console.log("error");
      alert("Error - Please try again.");
    }
  }

  async function makePatchRequest(coordinates) {
    try {
      let response = await axios.patch(
        `http://127.0.0.1:8000/api/cleanups/${props.cleanup.id}/`,
        coordinates,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("patch request:", response.data);
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
        <Modal dialogClassName="update-modal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {/* <Modal.Title className="title">{`Cleanup ${props.cleanup.id}`}</Modal.Title> */}
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
                <div className="form-flex-container">
                  <div className="basic-info-container">
                    <p>Basics</p>
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
                      <label>Time Spent</label>
                      <input
                        type="number"
                        value={time}
                        placeholder="Time Spent (in minutes)"
                        required
                        onChange={(event) => setTime(event.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Before Image</label>
                      <input
                        type="file"
                        onChange={(event) =>
                          setBeforeImg(event.target.files[0])
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>After Image</label>
                      <input
                        type="file"
                        onChange={(event) => setAfterImg(event.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="address-container">
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

export default UpdateCleanup;
