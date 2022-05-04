import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const GoalTracker = (props) => {
  //const [pond, setPond] = useState();

  //   function getPondImage() {
  //     if ((props.goalStats[2][1] = 0)) {
  //       setPond("./assets/pond_zero.png");
  //     } else if (props.goalStats[2][1] <= 25) {
  //       setPond("./assets/pond_quarter.png");
  //     } else if (props.goalStats[2][1] <= 50) {
  //       setPond("./assets/pond_half.png");
  //     } else if (props.goalStats[2][1] <= 75) {
  //       setPond("./assets/pond_threequarters.png");
  //     } else if (props.goalStats[2][1] <= 99) {
  //       setPond("./assets/pond_almost.png");
  //     } else if ((props.goalStats[2][1] = 100)) {
  //       setPond("./assets/pond_clean.png");
  //     } else if (props.goalStats[2][1] > 100) {
  //       setPond("./assets/pond_over.png");
  //     } else {
  //       setPond("./assets/pond_zero.png");
  //     }
  //     return pond;
  //   }
  if (props.goalStats.length === 0) {
    return null;
  } else {
    return (
      <div>
        <p>I'm the goal tracker</p>
        {/* <p>
        {props.goalStats.map((stat, i) => {
          return <li key={i}>{`${stat[0]}: ${stat[1]}`}</li>;
        })}
      </p> */}
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
        <div></div>
      </div>
    );
  }
};

export default GoalTracker;

//<img src={getPondImage()} alt="pond" />
