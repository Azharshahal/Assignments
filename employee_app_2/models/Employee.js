const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  EmployeeName: { type: String, required: true },
  EmployeeDesignation: { type: String, required: true },
  EmployeeLocation: { type: String, required: true },
  Salary: { type: Number, required: true }
});

module.exports = mongoose.model("Employee", employeeSchema);
