const form = document.querySelector('form');
const date = document.querySelector('#date');
const amount = document.querySelector('#amount');
const category = document.querySelector('#category');
const note = document.querySelector('#note');
const tableDiv = document.querySelector('table');

let filter = {};
if (localStorage.getItem('filter')) {
    filter = JSON.parse(localStorage.getItem('filter'));
} else {
    filter = {
        status: false,
        from: "2021-10-01",
        to: "2021-11-30"
    }
    localStorage.setItem('filter', JSON.stringify(filter))
}

const dataFilter = document.querySelector("#filter button");
dataFilter.addEventListener("click", () => {
    if (filter.status == false) {
        filter.status = true;
    } else {
        filter.status = false;
    }
    localStorage.setItem('filter', JSON.stringify(filter))
    location.reload();
})

let data;
if (localStorage.getItem('dataArr') && filter.status == false) {
    data = JSON.parse(localStorage.getItem('dataArr'));
} else if (localStorage.getItem('dataArr') && filter.status) {
    data = JSON.parse(localStorage.getItem('dataArr'));
    let newData = [];
    data.forEach((item) => {
        dateItem = new Date(item.date);
        if (dateItem >= new Date(filter.from) && dateItem <= new Date(filter.to)) {
            newData.push(item);
        }
    })
    data = newData;
}
else {
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
    let localData = JSON.parse(localStorage.getItem('dataArr'));
    localData.push(formObj);
    localStorage.setItem('dataArr', JSON.stringify(localData));
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

const cateArr = ["衣物饰品", "个人护理", "在外用餐", "零食",
    "房租住宿", "水电气费", "家装建材", "家居用品",
    "通信物流", "交通出行", "电器数码", "文化娱乐", "工作学习",
    "养宠物", "健身运动", "药品", "保险", "十一奉献", "收入", "借出"];

let cateHtml = '<option value="none">Please choose one</option>';

const cateOpt = document.querySelector('#category');

cateArr.forEach((item) => {
    cateHtml += `<option value=${item}>${item}</option>`
})

cateOpt.innerHTML = cateHtml;

const remove = document.querySelectorAll('.remove-item');

remove.forEach((item) => {
    item.addEventListener('click', () => {
        console.log("remove this");
    })
})

let graphData = {
};

cateArr.forEach((item) => {
    graphData[item] = 0;
})

data.forEach((item) => {
    let amount = parseInt(item.amount)
    graphData[item.category] += amount;
})

const netValue = document.querySelector('#net-value');

let sum = 0;
cateArr.forEach((item) => {
    sum -= graphData[item];
})


let netHtml =
    `<button class="btn btn-light btn-sm" id="net-value-btn">Net Value</button><br>
    <p id="net-value-number" style="display:none">${sum + 2 * graphData['收入']}</p>`;

netValue.innerHTML = netHtml;

const valueNum = document.querySelector("#net-value-number");
const valueBtn = document.querySelector("#net-value-btn");

valueBtn.addEventListener("click", () => {
    if (valueNum.style.display = "none") {
        valueNum.style.display = "block";
        valueBtn.addEventListener("click", () => {
            location.reload();
        })
    }
})

const main = document.querySelector('main');
const showGraph = document.querySelector('#graph');
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


let dataset = [];

cateArr.forEach((item) => {
    dataset.push(graphData[item])
})

const width = 1000;
const height = 500;
const margin = 50;
const padding = 50;

const barWidth = width / (dataset.length);

const xScale = d3.scaleBand()
    .domain(cateArr)
    .range([0, width]);

let x_axis = d3.axisBottom(xScale);

let yscale = d3.scaleLinear()
    .domain([d3.min(dataset), d3.max(dataset) + 50])
    .range([height, 0]);

console.log(yscale(100));

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
    .attr('height', (d) => yscale(0) - yscale(d))
    .attr('x', (d, i) => (barWidth * i + barWidth / 4))
    .attr('y', (d) => (height - yscale(0) + yscale(d)));

svg.append("g")
    .attr("transform", `translate(${padding},0)`)
    .call(y_axis);

svg.append("g")
    .attr("transform", `translate(${padding},${height})`)
    .call(x_axis);




