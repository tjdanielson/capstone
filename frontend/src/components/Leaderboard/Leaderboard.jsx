import "./Leaderboard.css";

const Leaderboard = (props) => {
  if (!props.users) {
    return null;
  } else {
    return (
      <div>
        <table className="leaderboard">
          <thead>
            <tr>
              <th>User</th>
              <th>Cleanups</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {props.users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{user[0]}</td>
                  <td>{user[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Leaderboard;
