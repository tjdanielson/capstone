import react, { useState, useEffect } from "react";
import "./UserStats.css";

const UserStats = (props) => {
  const [badgeCount, setBadgeCount] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (props.badges) {
      countBadges();
    }
  }, [props.badges]);

  useEffect(() => {
    if (props.totalMinutes) {
      getTime();
    }
  }, [props.totalMinutes]);

  function countBadges() {
    let count = props.badges[1].length;
    setBadgeCount(count);
  }

  //converts minutes object into a usable digit to display
  function getTime() {
    let time = Object.entries(props.totalMinutes[1]);
    if (!time[0][1]) {
      setMinutes(0);
    } else {
      setMinutes(time[0][1]);
    }
  }

  return (
    <div className="stats-flex-container">
      <div className="box">
        <div className="number">
          <h2>{props.cleanupCount}</h2>
        </div>
        <div className="words">
          <p>Total Cleanups</p>
        </div>
      </div>
      <div className="box">
        <div className="number">
          <h2>{badgeCount}</h2>
        </div>
        <div className="words">
          <p>Total Badges</p>
        </div>
      </div>
      <div className="box">
        <div className="number">{<h2>{minutes}</h2>}</div>
        <div className="words">
          <p>Total Minutes</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
