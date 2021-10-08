const form = document.querySelector('form');
const date = document.querySelector('#date');
const amount = document.querySelector('#amount');
const category = document.querySelector('#category');
const note = document.querySelector('#note');
const tableDiv = document.querySelector('table');

let data;

if (localStorage.getItem('dataArr')) {
    data = JSON.parse(localStorage.getItem('dataArr'));
} else {
    data = [];
}

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
    localStorage.setItem('dataArr', JSON.stringify(data));
    location.reload();
    e.preventDefault();
})

let tableHtml = `
      <tr class="row text-center">
      <th scope="col" class="col-2 offset-3">Date</th>
      <th scope="col" class="col-1">Amount</th>
      <th scope="col" class="col-2">Category</th>
      <th scope="col" class="col-2">Note</th>
      <th scope="col" class="col-1">Delete</th>
      </tr>`;

data.forEach((item) => {
    tableHtml += `
    <tr class="row text-center">
    <td class="col-2 offset-3">${item.date}</td>
    <td class="col-1">${item.amount}</td>
    <td class="col-2">${item.category}</td>
    <td class="col-2">${item.note}</td>
    <td class="col-1"><i class="fas fa-times-circle remove-item"></i></td>
    </tr>`;
});

tableDiv.innerHTML = tableHtml;

const remove = document.querySelectorAll('.remove-item');

remove.forEach((item) => {
    item.addEventListener('click', () => {
        console.log("remove this");
    })
})

let graphData = {
    "rent": 0,
    "food": 0,
    "clothes": 0,
    "traffic": 0
};

data.forEach((item) => {
    let amount = parseInt(item.amount)
    if (item.category == "rent") {
        graphData.rent += amount;
    } else if (item.category == "food") {
        graphData.food += amount;
    } else if (item.category == "clothes") {
        graphData.clothes += amount;
    } else if (item.category == "traffic") {
        graphData.traffic += amount;
    }
})

const main = document.querySelector('main');
const showGraph = document.querySelector('.analysis');
const graph = document.querySelector('#popup-graph');
const closeGraph = document.querySelector("#close-graph");

showGraph.addEventListener('click', () => {
    main.style.display = "none";
    graph.style.display = "block";
})

closeGraph.addEventListener('click', () => {
    main.style.display = "block";
    graph.style.display = "none";
})

let dataset = [graphData.rent, graphData.food, graphData.clothes, graphData.traffic];

const width = 500;
const height = 500;
const margin = 50;
const padding = 50;

const barWidth = width / (dataset.length);

const xScale = d3.scaleBand()
    .domain(['Rent', 'Food', 'Clothes', 'Traffic'])
    .range([0, width]);

let x_axis = d3.axisBottom(xScale);

let yscale = d3.scaleLinear()
    .domain([d3.min(dataset) - 50, d3.max(dataset) + 50])
    .range([height, 0]);

let y_axis = d3.axisLeft(yscale);

let svg = d3.select('svg')
    .attr("transform", `translate(${margin},0)`)
    .attr('width', `${width + padding * 2}`)
    .attr('height', `${height + padding * 2}`)

svg.append('g')
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('fill', 'grey')
    .attr("transform", `translate(${padding},0)`)
    .attr('width', `${barWidth / 2}`)
    .attr('height', (d) => yscale(d))
    .attr('x', (d, i) => (barWidth * i + barWidth / 4))
    .attr('y', (d) => (height - yscale(d)));

svg.append("g")
    .attr("transform", `translate(${padding},0)`)
    .call(y_axis);

svg.append("g")
    .attr("transform", `translate(${padding},${height})`)
    .call(x_axis);




