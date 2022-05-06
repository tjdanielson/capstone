const CommunityStats = (props) => {
  if (!props.stats) {
    return null;
  } else {
    return (
      <div>
        <h3>Community Stats</h3>
        <div>
          <p>{props.stats.total_cleanups}</p>
          <p>Total Cleanups</p>
        </div>
        <div>
          <p>{props.stats.badges_earned}</p>
          <p>Total Badges</p>
        </div>
        <div>
          <p>{props.stats.city_count}</p>
          <p>Cities</p>
        </div>
        <div>
          <p>{props.stats.user_count}</p>
          <p>Users</p>
        </div>
      </div>
    );
  }
};

export default CommunityStats;
