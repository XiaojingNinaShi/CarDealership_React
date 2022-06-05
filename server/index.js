const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Nina0908",
  database: "ffundb",
});

app.get("/vehicles", (req, res) => {
  db.query("SELECT * from vehicles", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/vehicle/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * from vehicles WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add", (req, res) => {
  const make = req.body.make;
  const model = req.body.model;
  const year = req.body.year;
  const price = req.body.price;
  const status = req.body.status;

  db.query(
    "INSERT INTO vehicles (make,model,year,price,status) VALUES(?,?,?,?,?)",
    [make, model, year, price, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/update/:id", (req, res) => {
  const id = req.body.id;
  const make = req.body.make;
  const model = req.body.model;
  const year = req.body.year;
  const price = req.body.price;

  db.query(
    "UPDATE vehicles SET make=?, model=?, year=?, price=? WHERE id=?",
    [make, model, year, price, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updatestatus/:id", (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  db.query(
    "UPDATE vehicles SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM vehicles WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/search", (req, res) => {
  const string = req.body.string;

  db.query(
    `SELECT * from vehicles WHERE make LIKE '%${string}%' OR model LIKE '%${string}%' OR year LIKE '%${string}%' OR id LIKE '%${string}%'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("connnected");
});
