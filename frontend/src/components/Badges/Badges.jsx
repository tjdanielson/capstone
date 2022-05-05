import react from "react";
const Badges = (props) => {
  if (!props.badges) {
    return null;
  } else {
    return (
      <div>
        <h3>BADGES</h3>
        {console.log(props.badges)}

        {props.badges[1].map((badge, i) => {
          return (
            <div key={i}>
              <p>{badge.description}</p>
              <img src={`http://127.0.0.1:8000${badge.unlocked_image}`} />
            </div>
          );
        })}
      </div>
    );
  }
};

export default Badges;
