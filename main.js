const form = document.querySelector('form');
const date = document.querySelector('#date');
const amount = document.querySelector('#amount');
const category = document.querySelector('#category');
const note = document.querySelector('#note');
const tableDiv = document.querySelector('table')

// let data = [];
let data = JSON.parse(localStorage.getItem('dataArr'));

form.addEventListener('submit', (e) => {
    let formObj = {
        date: "",
        amount: "",
        category: "",
        note: ""
    };
    formObj.date = date.value;
    formObj.amount = amount.value;
    formObj.category = category.value;
    formObj.note = note.value;
    data.push(formObj);
    console.log(data);
    localStorage.setItem('dataArr', JSON.stringify(data));
    location.reload();
    e.preventDefault();
})

let tableHtml = `
      <tr>
      <th>Date</th>
      <th>Amount</th>
      <th>Category</th>
      <th>Other note</th>
      </tr>`;

data.forEach((item) => {
    tableHtml += `
    <tr>
    <td>${item.date}</td>
    <td>${item.amount}</td>
    <td>${item.category}</td>
    <td>${item.note}</td>
    </tr>`;
});

tableDiv.innerHTML = tableHtml;

