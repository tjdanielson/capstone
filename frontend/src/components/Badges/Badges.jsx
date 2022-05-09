import react from "react";
import "./Badges.css";
const Badges = (props) => {
  if (!props.badges) {
    return null;
  } else {
    return (
      <div>
        <div className="header">
          <h3>BADGES</h3>
        </div>
        <div className="badge-container">
          {props.badges[1].map((badge, i) => {
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
  }
};

export default Badges;
