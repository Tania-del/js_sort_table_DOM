'use strict';

const table = document.querySelector('table');
const headers = table.querySelectorAll('th');
const tableBody = table.querySelector('tbody');
const tableRows = tableBody.querySelectorAll('tr');
const employees = [];

const replaceSalary = (salary) => {
  return Number(salary.replace(/[$,]/g, ''));
};

for (const element of tableRows) {
  const { children } = element;
  const [ nameEl, position, age, salary ] = children;
  const bio = {
    name: nameEl.textContent,
    position: position.textContent,
    age: age.textContent,
    salary: replaceSalary(salary.textContent),
  };

  employees.push(bio);
}

for (const header of headers) {
  const sortEmployees = ({ target }) => {
    const field = target.textContent.toLowerCase();
    const sortedEmployees = [...employees].sort((a, b) => a[field] - b[field]);
    const populatedData = sortedEmployees
      .map(({ nameEl, position, age, salary }) => `<tr>
    <td>${nameEl}</td>
    <td>${position}</td>
    <td>${age}</td>
    <td>$${salary.toLocaleString()}</td>
    </tr>`).join('');

    tableBody.innerHTML = populatedData;
  };

  header.addEventListener('click', sortEmployees);
}
