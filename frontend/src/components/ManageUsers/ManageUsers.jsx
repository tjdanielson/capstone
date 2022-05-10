import SuspendUser from "./SuspendUser";

const ManageUsers = (props) => {
  return (
    <div>
      <h3>Manage Users</h3>
      <table className="my-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Active?</th>
            <th>Date Joined</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {props.users.map((user, i) => {
            return (
              <tr key={i}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.is_staff ? "true" : "false"}</td>
                <td>{user.is_active ? "true" : "false"}</td>
                <td>{user.date_joined}</td>
                <td>
                  <SuspendUser user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
