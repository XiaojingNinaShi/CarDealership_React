import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ViewUpdateModal from "./ViewUpdateModal";
const Vehicle = ({ vehicle }) => {
  const [viewUpdateShow, setViewUpdateShow] = useState(false);
  return (
    <>
      <td>{vehicle.id}</td>
      <td>{vehicle.make}</td>
      <td>{vehicle.model}</td>
      <td>{vehicle.year}</td>
      <td>{vehicle.price}</td>
      <td>{vehicle.status === 1 ? "Live" : "Sold"}</td>
      <td>
        <Button
          variant="outline"
          style={{ backgroundColor: "transparent" }}
          onClick={() => {
            setViewUpdateShow(true);
          }}
        >
          <i className="bi bi-eye-fill"></i>
          <i className="bi bi-pencil-fill"></i>
        </Button>
      </td>
      <ViewUpdateModal
        vehicle={vehicle}
        viewUpdateShow={viewUpdateShow}
        setViewUpdateShow={setViewUpdateShow}
      />
    </>
  );
};

export default Vehicle;
