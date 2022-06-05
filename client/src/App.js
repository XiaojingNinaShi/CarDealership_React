import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Stack,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Axios from "axios";
import Chart from "./Chart";
import AddModal from "./AddModal";
import Vehicle from "./Vehicle";

function App() {
  const [addModalShow, setAddModalShow] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [searchString, setSearchString] = useState();

  const getVehicles = () => {
    Axios.get("http://localhost:3001/vehicles").then((res) => {
      setVehicles(res.data);
    });
  };

  const searchVehicle = () => {
    Axios.post("http://localhost:3001/search", { string: searchString }).then(
      (res) => {
        setVehicles(res.data);
      }
    );
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <Container className="my-4">
      <Row>
        <Col sm={3} className="border py-4">
          <p
            style={{
              backgroundColor: "#eee",
              textAlign: "center",
              fontSize: "24px",
            }}
          >
            Inventory
          </p>
        </Col>

        <Col sm={9} className="border py-4">
          <Stack gap={2}>
            <Row className="justify-content-space-between">
              <Col>
                <Button variant="warning" onClick={() => setAddModalShow(true)}>
                  Add New Viechle
                </Button>
              </Col>
              <Col>
                <InputGroup>
                  <FormControl
                    placeholder="Search"
                    type="input"
                    value={searchString}
                    onChange={(e) => {
                      setSearchString(e.target.value);
                    }}
                  />
                  <Button
                    variant="dark"
                    onClick={() => {
                      searchVehicle();
                    }}
                  >
                    <i className="bi bi-search"></i>
                  </Button>
                </InputGroup>
              </Col>
            </Row>
            <hr style={{ margin: "1rem -0.75rem" }} />
            <Row>{vehicles && <Chart vehicles={vehicles} />}</Row>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No#</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles &&
                  vehicles.length > 0 &&
                  vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <Vehicle vehicle={vehicle} />
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Stack>
        </Col>
      </Row>

      {/* Add New Vehicle Modal  */}
      <AddModal addModalShow={addModalShow} setAddModalShow={setAddModalShow} />
    </Container>
  );
}

export default App;
