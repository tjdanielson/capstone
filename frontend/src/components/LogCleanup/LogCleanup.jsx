import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useAuth from "../../hooks/useAuth";
import "./LogCleanup.css";
import LogMap from "../../components/LogMap/LogMap";

const LogCleanup = (props) => {
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

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [beforeImg, setBeforeImg] = useState("");
  const [afterImg, setAfterImg] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  //checks for coordinates from google geocoding, converts them to the correct format and makes a patch request after the initial post request is complete
  useEffect(() => {
    if (lat && lng && id > 0) {
      let coordinates = {
        latitude: lat.toFixed(7),
        longitude: lng.toFixed(7),
      };
      makePatchRequest(coordinates);
    }
  }, [lat, lng, id]);

  // gets coordinates from the marker placed by the user on the map in the logcleanup form
  const getMapCoords = (childLat, childLng) => {
    setLat(childLat);
    setLng(childLng);
  };

  //checks if an address was included in the cleanup log, if it does, it sends address to get coordinates from google's geocoding api
  function handleSumbit(event) {
    event.preventDefault();
    if (street && city && state) {
      getCoordinates();
    }
    makePostRequest();
  }

  //google geocoding api
  async function getCoordinates() {
    try {
      let response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${city}+${state}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      let data = response.data;
      setLat(data.results[0].geometry.location.lat);
      setLng(data.results[0].geometry.location.lng);
    } catch (ex) {
      alert(
        "We were unable to get coordinates for the address on your cleanup. To see your cleanup on your map, edit the cleanup with a legitimate address."
      );
    }
  }

  async function makePostRequest() {
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
      let response = await axios.post(
        "http://127.0.0.1:8000/api/cleanups/",
        fd,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setId(response.data.id);
      }
    } catch (ex) {
      console.log("error in post request");
      alert("Error - Please try again.");
    }
  }

  //patches the cleanup made with the post request with coordinates from google
  async function makePatchRequest(coordinates) {
    try {
      let response = await axios.patch(
        `http://127.0.0.1:8000/api/cleanups/${id}/`,
        coordinates,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("patch request:", response.data);
      window.location.reload(false);
    } catch (ex) {
      console.log("error");
      alert(
        "We were unable to get coordinates for the address on your cleanup. To see your cleanup on your map, edit the cleanup with a legitimate address."
      );
    }
  }

  return (
    <div className="container">
      <>
        <Button className="modal-button" variant="primary" onClick={handleShow}>
          Log a Cleanup
        </Button>
        <Modal show={show} onHide={handleClose}>
          <div className="modal-content">
            <Modal.Header closeButton>
              <Modal.Title className="title">Log a Cleanup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="my-form">
                <form>
                  <div className="form-group">
                    <input
                      type="date"
                      value={date}
                      placeholder="Date of Cleanup*"
                      required
                      onChange={(event) => setDate(event.target.value)}
                    />
                    <p className="required">This field is required</p>
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      value={time}
                      placeholder="Time Spent (in minutes)*"
                      required
                      onChange={(event) => setTime(event.target.value)}
                    />
                    <p className="required">This field is required</p>
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      placeholder="Before Image"
                      onChange={(event) => setBeforeImg(event.target.files[0])}
                      ref={inputRef}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      placeholder="After Image"
                      onChange={(event) => setAfterImg(event.target.files[0])}
                    />
                  </div>
                  <p className="instructions">
                    Choose a location by entering a street address OR by
                    dropping a pin on the map below
                  </p>
                  <h4>Street Address</h4>
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
                  <h4>Drop a Pin</h4>
                </form>

                <LogMap setMapCoords={getMapCoords} />
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

export default LogCleanup;
