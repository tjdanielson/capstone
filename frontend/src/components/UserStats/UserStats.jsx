import react from "react";

const UserStats = (props) => {
  return (
    <div>
      <div>
        <p>{props.cleanupCount}</p>
        <p>Total Cleanups</p>
      </div>
      <div>
        <p>{props.badgeCount}</p>
        <p>Total Badges</p>
      </div>
    </div>
  );
};

export default UserStats;
