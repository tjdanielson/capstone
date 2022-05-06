import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Pond from "./Pond";
import UpdateGoal from "./UpdateGoal";

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
      <div>
        <div>
          <h3>{props.goalStats[0][1]}</h3>
          <h3>Cleanups logged this week</h3>
        </div>
        <div>
          <h3>{`You're ${props.goalStats[2][1]}% of the way to your goal!`}</h3>
        </div>
        <div>
          <h3>{props.goalStats[1][1]}</h3>
          <UpdateGoal goalId={props.goalStats[3][1]} />
          <h3>Current weekly cleanup goal</h3>
        </div>
        <div>
          <Pond percentage={props.goalStats[2][1]} />
        </div>
      </div>
    );
  }
};

export default GoalTracker;

//
