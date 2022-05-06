const CommunityStats = (props) => {
  console.log(props.stats[0]);
  return (
    <div>
      <h3>Community Stats</h3>
      <p>Total Cleanups</p>
      <p>Total Badges</p>
      <p>Cities</p>
      <p>Users</p>
    </div>
  );
};

export default CommunityStats;
