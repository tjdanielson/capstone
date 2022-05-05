import react, { useState, useEffect } from "react";

const UserStats = (props) => {
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    countBadges();
  }, [props.badges]);

  function countBadges() {
    let count = props.badges[1].length;
    setBadgeCount(count);
  }

  return (
    <div>
      <h3>YOUR STATS</h3>
      <div>
        <p>{props.cleanupCount}</p>
        <p>Total Cleanups</p>
      </div>
      <div>
        {console.log("badgecount: ", badgeCount)}
        {console.log("badges[2]", props.badgeCount)}
        <p>{badgeCount}</p>
        <p>Total Badges</p>
      </div>
    </div>
  );
};

export default UserStats;

//        <p>{props.badgeCount}</p>
