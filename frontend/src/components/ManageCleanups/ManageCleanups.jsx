const ManageCleanups = (props) => {
  return (
    <div>
      <h3>Manage Cleanups</h3>
      <table className="my-table">
        <thead>
          <tr>
            <th>Date Logged</th>
            <th>Time Spent</th>
            <th>Date of Cleanup</th>
            <th>User</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-body">
          {props.cleanups.map((cleanup, i) => {
            return (
              <tr key={i}>
                <td>{cleanup.date_submitted}</td>
                <td>{cleanup.time_spent}</td>
                <td>{cleanup.date_cleanup}</td>
                <td>{cleanup.user.username}</td>
                {/* <td>
                    <DeleteCleanup cleanupId={cleanup.id} />
                  </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCleanups;
