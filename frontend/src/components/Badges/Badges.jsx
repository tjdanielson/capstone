import react from "react";
import "./Badges.css";
const Badges = (props) => {
  //returns null if props.badges has not been set yet, returns a statement to start logging cleanups if props.badges exists, but there are not badges
  if (props.badges.length === 0) {
    return null;
  } else if (props.badges[3][1].length === 0) {
    return (
      <div>
        <div className="header">
          <h3>BADGES</h3>
        </div>
        <p className="generic-text">Start logging cleanups to earn badges!</p>
      </div>
    );
  }
  return (
    <div>
      <div className="header">
        <h3>BADGES</h3>
      </div>
      <div className="badge-container">
        {props.badges[3][1].map((badge, i) => {
          return (
            <div className="badge-card" key={i}>
              <div className="img-container">
                <img src={`http://127.0.0.1:8000${badge.unlocked_image}`} />
              </div>
              <p>Earned for logging {badge.cleanup_prereq} cleanup(s).</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;
