const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { employees, getNextId } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

// Home - list employees
app.get('/', (req, res) => {
  res.render('index', { employees });
});

// Add employee form
app.get('/add', (req, res) => {
  res.render('add');
});

// Handle add employee
app.post('/add', (req, res) => {
  const { EmployeeName, EmployeeDesignation, EmployeeLocation, Salary } = req.body;
  const id = getNextId();
  employees.push({
    id,
    EmployeeName,
    EmployeeDesignation,
    EmployeeLocation,
    Salary: Number(Salary) || 0
  });
  res.redirect('/');
});

// Edit form
app.get('/edit/:id', (req, res) => {
  const id = Number(req.params.id);
  const emp = employees.find(e => e.id === id);
  if (!emp) return res.status(404).send('Employee not found');
  res.render('edit', { emp });
});

// Handle edit
app.post('/edit/:id', (req, res) => {
  const id = Number(req.params.id);
  const emp = employees.find(e => e.id === id);
  if (!emp) return res.status(404).send('Employee not found');

  const { EmployeeName, EmployeeDesignation, EmployeeLocation, Salary } = req.body;
  emp.EmployeeName = EmployeeName;
  emp.EmployeeDesignation = EmployeeDesignation;
  emp.EmployeeLocation = EmployeeLocation;
  emp.Salary = Number(Salary) || 0;

  res.redirect('/');
});

// Handle delete
app.post('/delete/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = employees.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).send('Employee not found');
  employees.splice(idx, 1);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
