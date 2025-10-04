const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// GET - list all employees
router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.render("index", { employees });
});

// GET - Add employee form
router.get("/add", (req, res) => {
  res.render("add");
});

// POST - Add new employee
router.post("/add", async (req, res) => {
  const { EmployeeName, EmployeeDesignation, EmployeeLocation, Salary } = req.body;
  await Employee.create({ EmployeeName, EmployeeDesignation, EmployeeLocation, Salary });
  res.redirect("/");
});

// GET - Edit form
router.get("/edit/:id", async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  res.render("edit", { emp });
});

// PUT - Update employee
router.put("/edit/:id", async (req, res) => {
  const { EmployeeName, EmployeeDesignation, EmployeeLocation, Salary } = req.body;
  await Employee.findByIdAndUpdate(req.params.id, { EmployeeName, EmployeeDesignation, EmployeeLocation, Salary });
  res.redirect("/");
});

// DELETE - Delete employee
router.delete("/delete/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
