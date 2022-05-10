import "../UserStats/UserStats.css";

const CommunityStats = (props) => {
  {
    console.log(props.stats);
  }
  if (!props.stats) {
    return null;
  } else {
    return (
      <div className="stats-flex-container">
        <div className="box">
          <div className="number">
            <h2>{props.stats.total_cleanups}</h2>
          </div>
          <div className="words">
            <p>Total Cleanups</p>
          </div>
        </div>
        <div className="box">
          <div className="number">
            <h2>{props.stats.badges_earned}</h2>
          </div>
          <div className="words">
            <p>Total Badges</p>
          </div>
        </div>
        <div className="box">
          <div className="number">
            <h2>{props.stats.city_count}</h2>
          </div>
          <div className="words">
            <p>Cities</p>
          </div>
        </div>
        <div className="box">
          <div className="number">
            <h2>{props.stats.user_count}</h2>
          </div>
          <div className="words">
            <p>Users</p>
          </div>
        </div>
      </div>
    );
  }
};

export default CommunityStats;
