import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Pond from "./Pond";

import axios from "axios";

const GoalTracker = (props) => {
  if (props.goalStats.length === 0) {
    return null;
  } else {
    return (
      <div>
        <p>I'm the goal tracker</p>
        <div>
          <h3>{props.goalStats[0][1]}</h3>
          <h3>Cleanups logged this week</h3>
        </div>
        <div>
          <h3>{`You're ${props.goalStats[2][1]}% of the way to your goal!`}</h3>
        </div>
        <div>
          <h3>{props.goalStats[1][1]}</h3>
          <button>Update</button>
          <h3>Current weekly cleanup goal</h3>
        </div>
        <div>
          <Pond percentage={101} />
        </div>
      </div>
    );
  }
};

export default GoalTracker;

//props.goalStats[2][1]
