import React, { useState } from "react";

const ManageCleanups = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchUsers = (event) => {
    event.preventDefault();
    let filteredCleanups = props.cleanups.filter((cleanup, i) => {
      if (cleanup.user.username == searchTerm) {
        return cleanup;
      }
    });
    setSearchResults(filteredCleanups);
  };

  return (
    <div>
      <h3>Manage Cleanups</h3>
      <div className="search">
        <form onSubmit={searchUsers}>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit">Filter</button>
        </form>
      </div>
      {searchResults && (
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
            {searchResults.map((cleanup, i) => {
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
      )}
    </div>
  );
};

export default ManageCleanups;
