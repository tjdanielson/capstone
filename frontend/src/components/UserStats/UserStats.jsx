import react, { useState, useEffect } from "react";
import "./UserStats.css";

const UserStats = (props) => {
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    if (props.badges) {
      countBadges();
    }
  }, [props.badges]);

  function countBadges() {
    let count = props.badges[1].length;
    setBadgeCount(count);
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
        {console.log("badgecount: ", badgeCount)}
        {console.log("badges[2]", props.badgeCount)}
        <div className="number">
          <h2>{badgeCount}</h2>
        </div>
        <div className="words">
          <p>Total Badges</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;

//        <p>{props.badgeCount}</p>
