// data.js - simple in-memory "database"
let employees = [
  { id: 1, EmployeeName: "Asha Menon", EmployeeDesignation: "Librarian", EmployeeLocation: "Thiruvananthapuram", Salary: 35000 },
  { id: 2, EmployeeName: "Ravi Kumar", EmployeeDesignation: "Developer", EmployeeLocation: "Kochi", Salary: 50000 },
  { id: 3, EmployeeName: "Priya Nair", EmployeeDesignation: "Designer", EmployeeLocation: "Kozhikode", Salary: 42000 }
];

let nextId = 4;

module.exports = {
  employees,
  getNextId: () => nextId++,
};
