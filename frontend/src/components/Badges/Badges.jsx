import react from "react";
import "./Badges.css";
const Badges = (props) => {
  console.log(props.badges);
  console.log(props.badges.length);
  if (props.badges.length === 0) {
    return (
      <div>
        <p className="generic-text">Start logging cleanups to earn badges!</p>
      </div>
    );
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
        {console.log("badges3: ", props.badges[3][1])}
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
