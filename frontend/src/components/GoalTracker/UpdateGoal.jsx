import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./GoalTracker.css";

const UpdateGoal = (props) => {
  const [user, token] = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSave = (event) => {
    setShow(false);
    handleSumbit(event);
  };

  const [goal, setGoal] = useState("");

  function handleSumbit(event) {
    event.preventDefault();
    let newGoal = {
      goal: goal,
    };
    setGoal("");
    makePostRequest(newGoal);
  }

  async function makePostRequest(newGoal) {
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/goals/`,
        newGoal,
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
          Update
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="title">Update Your Goal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="my-form">
              <form>
                <div className="form-group">
                  <label>New Goal</label>
                  <input
                    type="number"
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
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
        </Modal>
      </>
    </div>
  );
};

export default UpdateGoal;
