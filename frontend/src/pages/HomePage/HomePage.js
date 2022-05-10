import React from "react";
import reactDom from "react-dom";
import "../../App.css";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="banner"></div>
      <div className="body-content">
        <h1>Welcome to Litter Pickers!</h1>
        <p>
          Picking up litter in your community has far reaching impacts. It not
          only benefits you and your neighbors, but also protects wildlife,
          helps keep our local waterways clean, and prevents litter from
          becoming aquatic trash and spreading beyond our community -
          potentially into oceans.
        </p>
        <p>
          Aquatic trash affects water quality, endangers plants and animals, and
          pollutes our outdoor spaces. According to the EPA, one of the best
          ways we can minimize the impact of aquatic trash is by disposing of
          waste properly.
        </p>
        <div className="icons">
          <div className="icon-holder">
            <img src="../assets/wildlife.png" alt="deer-jumping" />
            <p>Protect wildlife</p>
          </div>

          <div className="icon-holder">
            <img src="../assets/waterways.png" alt="tap-with-water-dripping" />
            <p>Clean Waterways</p>
          </div>

          <div className="icon-holder">
            <img src="../assets/oceans.png" alt="reef-with-fish" />
            <p>Protect Oceans</p>
          </div>
        </div>

        <h3>So what are you waiting for? </h3>
        <p>
          Join our online community of people all over the US who are helping to
          keep our land and water clean one cleanup at a time!{" "}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
