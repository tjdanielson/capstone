import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Pond from "./Pond";
import UpdateGoal from "./UpdateGoal";
import "./GoalTracker.css";

import axios from "axios";

const GoalTracker = (props) => {
  if (props.goalStats.length === 0) {
    return null;
  } else if (props.goalStats[1][1] === 0) {
    return (
      <div>
        <div>
          <h3>{props.goalStats[0][1]}</h3>
          <h3>Cleanups logged this week</h3>
        </div>
        <div>
          <h3>{props.goalStats[1][1]}</h3>
          <UpdateGoal goalId={props.goalStats[3][1]} />
          <h3>Update your goal to start tracking your progress!</h3>
        </div>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/update_goal.png`}
            alt="update goal text on top of pond"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex-container">
        <div className="stats-container">
          <div className="box-container">
            <div className="box-contents">
              <div className="logged-cleanups-number">
                <h3>{props.goalStats[0][1]}</h3>
              </div>
              <p>Cleanups logged this week</p>
            </div>
          </div>

          <div className="box-container">
            <div className="box-contents">
              <div className="weekly-goal-button-container">
                <h3>{props.goalStats[1][1]}</h3>
                <UpdateGoal goalId={props.goalStats[3][1]} />
              </div>
              <p>Current weekly cleanup goal</p>
            </div>
          </div>
        </div>
        <div className="pond-container">
          <Pond percentage={props.goalStats[2][1]} />
          <div className="pond-motivation">
            <h3>{`You're ${props.goalStats[2][1]}% of the way to your goal!`}</h3>
            <p>Keep logging cleanups to clean your pond!</p>
          </div>
        </div>
      </div>
    );
  }
};

export default GoalTracker;

//
