import React from "react";
import AddNewBadge from "./AddNewBadge";
import DeleteBadge from "./DeleteBadge";

const ManageBadges = (props) => {
  return (
    <div>
      <h3>Manage Badges</h3>
      <AddNewBadge />
      <table className="my-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Cleanup Pre-req</th>
            <th>Image</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-body">
          {props.badges.map((badge, i) => {
            return (
              <tr key={i}>
                <td>{badge.id}</td>
                <td>{badge.description}</td>
                <td>{badge.cleanup_prereq}</td>
                <td>{badge.unlocked_image}</td>
                <td>
                  <DeleteBadge badgeId={badge.id} />
                </td>
                {/* <td>
                      <UpdateCleanup cleanup={cleanup} />
                    </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBadges;
