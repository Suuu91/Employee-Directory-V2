const express = require(`express`)
const router = express.Router()

module.export = router

const employees = require("../employees.js");

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    next({status: 404, message: `no employee found with id ${id}`});
  }
});

router.post("/", (req, res ,next) => {
  const {newEmployee} = req.body
  employees.push(newEmployee)
  res.status(201).json(employees)
})