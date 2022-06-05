import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Axios from "axios";

const AddModal = ({ addModalShow, setAddModalShow }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");

  const addVehicle = () => {
    Axios.post("http://localhost:3001/add", {
      make: make,
      model: model,
      year: year,
      price: price,
      status: 1,
    }).then((res) => {
      setAddModalShow(false);
      window.location.reload();
    });
  };
  return (
    <Modal show={addModalShow} onHide={() => setAddModalShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Make</Form.Label>
            <Form.Control
              type="input"
              placeholder="make"
              onChange={(e) => {
                setMake(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="input"
              placeholder="model"
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="input"
              placeholder="year"
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="input"
              placeholder="price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setAddModalShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={addVehicle}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
