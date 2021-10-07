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
      <tr class="row">
      <th scope="col" class="col-2 offset-4">Date</th>
      <th scope="col" class="col-2">Amount</th>
      <th scope="col" class="col-2">Category</th>
      <th scope="col" class="col-2">Other note</th>
      </tr>`;

data.forEach((item) => {
    tableHtml += `
    <tr class="row">
    <td class="col-2 offset-4">${item.date}</td>
    <td class="col-2">${item.amount}</td>
    <td class="col-2">${item.category}</td>
    <td class="col-2">${item.note}</td>
    </tr>`;
});

tableDiv.innerHTML = tableHtml;

