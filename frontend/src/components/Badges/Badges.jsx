import react from "react";
const Badges = (props) => {
  return (
    <div>
      <h3>BADGES</h3>
      {console.log(props.badges)}
      <div>
        {props.badges[1].map((badge, i) => {
          return (
            <div>
              <p>{badge.description}</p>
              <a>{badge.unlocked_image}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;
