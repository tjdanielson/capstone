import React, { useState } from "react";
import { Button } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CleanupList = (props) => {
  const [showTable, setShowTable] = useState(false);

  const handleShow = () => setShowTable(true);

  return (
    <div>
      <div>
        <>
          <button
            className="modal-button"
            variant="primary"
            onClick={handleShow}
          >
            See all Cleanups
          </button>
        </>
      </div>
      {showTable && (
        <table className="my-table">
          <thead>
            <tr>
              <th>Date Logged</th>
              <th>Date of Cleanup</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {props.cleanups.map((cleanup, i) => {
              return (
                <tr key={i}>
                  <td>{cleanup.date_submitted}</td>
                  <td>{cleanup.date_cleanup}</td>
                  {/* <td><DeleteSong songIdproperty={song.id} reloadMusic={makeGetRequest}/></td>
                                <td><UpdateSong song={song} reloadMusic={makeGetRequest}/></td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CleanupList;
