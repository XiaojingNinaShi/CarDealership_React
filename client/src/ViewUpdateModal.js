import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Axios from "axios";

const ViewUpdateModal = ({ vehicle, viewUpdateShow, setViewUpdateShow }) => {
  const [make, setMake] = useState(vehicle.make);
  const [model, setModel] = useState(vehicle.model);
  const [year, setYear] = useState(vehicle.year);
  const [price, setPrice] = useState(vehicle.price);

  const updateStatus = (id) => {
    Axios.put(`http://localhost:3001/updatestatus/${id}`, {
      id: vehicle.id,
      status: false,
    }).then(() => {
      setViewUpdateShow(false);
      window.location.reload();
    });
  };

  const updateVehicle = (id) => {
    Axios.put(`http://localhost:3001/update/${id}`, {
      id: vehicle.id,
      make: make,
      model: model,
      year: year,
      price: price,
    }).then(() => {
      setViewUpdateShow(false);
      window.location.reload();
    });
  };

  return (
    <Modal
      show={viewUpdateShow}
      onHide={() => {
        setViewUpdateShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>View/Update Vehicle</Modal.Title>
      </Modal.Header>
      {vehicle && (
        <div>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Make</Form.Label>
                <Form.Control
                  type="input"
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="input"
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="input"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="input"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {vehicle.status === 1 && (
              <Button
                variant="warning"
                onClick={() => updateStatus(vehicle.id)}
              >
                Mark As Sold
              </Button>
            )}

            <Button variant="warning" onClick={() => updateVehicle(vehicle.id)}>
              Update
            </Button>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
};

export default ViewUpdateModal;
