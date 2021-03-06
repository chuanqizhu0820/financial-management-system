const form = document.querySelector('#add-form');
const date = document.querySelector('#input-date');
const amount = document.querySelector('#amount');
const category = document.querySelector('#category');
const note = document.querySelector('#note');
const table = document.querySelector('.table');

let filter = {};
if (localStorage.getItem('filter')) {
    filter = JSON.parse(localStorage.getItem('filter'));
} else {
    filter = {
        status: false,
        from: "",
        to: ""
    }
    localStorage.setItem('filter', JSON.stringify(filter))
}

let cateFilter = {};
if (localStorage.getItem('catefilter')) {
    cateFilter = JSON.parse(localStorage.getItem('catefilter'));
} else {
    cateFilter = {
        status: false,
        cate: "",
    }
    localStorage.setItem('catefilter', JSON.stringify(cateFilter))
}


let graphStatus = {};
if (localStorage.getItem('graph')) {
    graphStatus = JSON.parse(localStorage.getItem('graph'));
} else {
    graphStatus = {
        status: false
    }
    localStorage.setItem('graph', JSON.stringify(graphStatus));
}

const filterBtns = document.querySelector("#filter");

if (filter.status) {
    filterBtns.innerHTML =

        ` <label id="filter-label">Date Filter</label>
        <label class="switch">
        <input type="checkbox" id="switch" checked>
        <span class="slider"></span>
        </label>
        <i class="fas fa-edit" id="edit"></i>
        `
}
else if (filter.status == false) {
    filterBtns.innerHTML =
        `  <label id="filter-label">Date Filter</label>
        <label class="switch">
        <input type="checkbox" id="switch" unchecked>
        <span class="slider"></span>
        </label>
          <i class="fas fa-edit" id="edit"></i>
          `
}

const cateFilterBtn = document.querySelector("#cate-filter");

if (cateFilter.status) {
    cateFilterBtn.innerHTML =
        ` <label id="filter-label">Category Filter</label>
        <label class="switch">
        <input type="checkbox" id="switch" checked>
        <span class="slider"></span>
        </label>
        <i class="fas fa-edit" id="cate-edit"></i>
        `
}
else if (cateFilter.status == false) {
    cateFilterBtn.innerHTML =
        `  <label id="filter-label">Category Filter</label>
        <label class="switch">
        <input type="checkbox" id="switch" unchecked>
        <span class="slider"></span>
        </label>
          <i class="fas fa-edit" id="cate-edit"></i>
          `
}

const filterSwitch = document.querySelector("#filter #switch");
filterSwitch.addEventListener("click", () => {
    if (filter.status == false) {
        filter.status = true;
    } else {
        filter.status = false;
    }
    localStorage.setItem('filter', JSON.stringify(filter))
    location.reload();
})

const cateFilterSwitch = document.querySelector("#cate-filter #switch");
cateFilterSwitch.addEventListener("click", () => {
    if (cateFilter.status == false) {
        cateFilter.status = true;
    } else {
        cateFilter.status = false;
    }
    localStorage.setItem('catefilter', JSON.stringify(cateFilter))
    location.reload();
})


let data;

if (localStorage.getItem('dataArr') && filter.status == false && cateFilter.status == false) {
    data = JSON.parse(localStorage.getItem('dataArr'));
}
else if (localStorage.getItem('dataArr') && filter.status && cateFilter.status == false) {
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
else if (localStorage.getItem('dataArr') && cateFilter.status && filter.status == false) {
    data = JSON.parse(localStorage.getItem('dataArr'));
    let newData = [];
    data.forEach((item) => {
        if (item.category == cateFilter.cate) {
            newData.push(item);
        }
    })
    data = newData;
}
else if (localStorage.getItem('dataArr') && cateFilter.status && filter.status) {
    data = JSON.parse(localStorage.getItem('dataArr'));
    let newData = [];
    data.forEach((item) => {
        dateItem = new Date(item.date);
        if (item.category == cateFilter.cate && dateItem >= new Date(filter.from) && dateItem <= new Date(filter.to)) {
            newData.push(item);
        }
    })
    data = newData;
}
else {
    data = [];
    localStorage.setItem('dataArr', JSON.stringify(data));
}

form.addEventListener('submit', (e) => {
    let formObj = {
        date: "",
        amount: "",
        category: "",
        note: "",
        index: ""
    };
    formObj.date = date.value;
    formObj.amount = amount.value;
    formObj.category = category.value;
    formObj.note = note.value;
    formObj.index = date.value + amount.value + category.value + note.value;
    let localData = JSON.parse(localStorage.getItem('dataArr'));
    localData.push(formObj);

    localData.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    }).reverse();

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
    <td class="col-1"><i class="fas fa-times-circle remove-item"></i><span> | </span><i class="fas fa-edit edit-item""></i></td>
    </tr>`;
});

table.innerHTML = tableHtml;

const cateArr = ["????????????", "????????????", "????????????", "??????",
    "????????????", "????????????", "????????????", "????????????",
    "????????????", "????????????", "????????????", "????????????", "????????????",
    "?????????", "????????????", "??????", "??????", "????????????", "??????", "??????"];

let cateHtml = '<option value="none">Please choose one</option>';

const cateOpt = document.querySelector('#category');

cateArr.forEach((item) => {
    cateHtml += `<option value=${item}>${item}</option>`
})

cateOpt.innerHTML = cateHtml;

const remove = document.querySelectorAll('.remove-item');

remove.forEach((item, i) => {
    item.addEventListener('click', () => {
        let localData = JSON.parse(localStorage.getItem('dataArr'));

        localData.forEach((item) => {
            if (item.index === data[i].index) {
                localData.splice(i, 1);
                localStorage.setItem('dataArr', JSON.stringify(localData));
                location.reload();
            }
        })
    })
})

const editItem = document.querySelectorAll(".edit-item");

editItem.forEach((item, i) => {
    item.addEventListener('click', () => {
        let localData = JSON.parse(localStorage.getItem('dataArr'));
        localData.forEach((item) => {
            if (item.index === data[i].index) {
                form.date.value = item.date;
                form.amount.value = item.amount;
                form.category.value = item.category;
                form.note.value = item.note;
                localData.splice(i, 1);
                localStorage.setItem('dataArr', JSON.stringify(localData));
            }
        })
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
    <p id="net-value-number" style="display:none">${sum + 2 * graphData['??????']}</p>`;

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

const graphBtn = document.querySelector('#graph');
const graph = document.querySelector('#popup-graph');

if (graphStatus.status) {
    graphBtn.innerHTML =

        `<label id="graph-label">Graph</label>
        <label class="switch">
        <input type="checkbox" id="graph-switch" checked>
        <span class="slider"></span>
        </label> `;
} else {
    graphBtn.innerHTML =
        `<label id="graph-label">Graph</label>
        <label class="switch">
        <input type="checkbox" id="graph-switch" unchecked>
        <span class="slider"></span>
        </label> `;
}
const graphSwitch = document.querySelector('#graph-switch')

if (graphStatus.status == true) {
    table.style.display = "none";
    graph.style.display = "block";
} else {
    table.style.display = "table";
    graph.style.display = "none";
}

graphSwitch.addEventListener('click', () => {
    if (graphStatus.status) {
        graphStatus.status = false;
    }
    else {
        graphStatus.status = true;
    }
    localStorage.setItem('graph', JSON.stringify(graphStatus));
    if (graphStatus.status == true) {
        table.style.display = "none";
        graph.style.display = "block";
    } else {
        table.style.display = "table";
        graph.style.display = "none";
    }
    // location.reload();
})

const fixedForm = document.querySelector("#fixed-form");
const openEdit = document.querySelector("#filter #edit");
const filterDiv = document.querySelector("#popup-filter");

filterDiv.innerHTML =
    `<p>The current filter condition is</p>
    <p>[From] ${filter.from}</p>
    <p>[To] ${filter.to}</p>
            <form id="edit-filter">
                <div class="mb-3">
                    <label for="from" class="form-label fw-bold">From</label>
                    <input type="date" id="datefrom" name="from" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="to" class="form-label fw-bold">To</label>
                    <input type="date" id="dateto" name="to" class="form-control">
                </div>
                <button type="submit" class="btn btn-secondary">Update</button>
            </form>
            <button id="close-edit" class="btn btn-light-sm mt-3">Close</button>`;

const closeEdit = document.querySelector("#close-edit");
const editForm = document.querySelector("#edit-filter")

openEdit.addEventListener("click", () => {
    filterDiv.style.display = "block";
    fixedForm.style.display = "none";
})

closeEdit.addEventListener("click", () => {
    filterDiv.style.display = "none";
    fixedForm.style.display = "block";
})

const dateFrom = document.querySelector("#datefrom");
const dateTo = document.querySelector("#dateto");

editForm.addEventListener("submit", () => {
    filter.from = dateFrom.value;
    filter.to = dateTo.value;
    console.log(dateFrom.value);
    filter.status = true;
    localStorage.setItem('filter', JSON.stringify(filter));
    // location.reload();
})

const cateFilterDiv = document.querySelector("#popup-cate-filter");
cateFilterDiv.innerHTML =
    `
<p>the current filter condition is</p>
<p> [Category] ${cateFilter.cate} </p>
           <form id="edit-cate-filter">
                <div class="mb-3">
                    <label for="from" class="form-label fw-bold">Category</label>
                    <select name="category" id="category" class="form-select" aria-label="Default select example">
                    ` + cateHtml +
    `</select>
                </div>
                <button type="submit" class="btn btn-secondary">Update</button>
            </form>
            <button id="close-cate-edit" class="btn btn-light-sm mt-3">Close</button>`;

const openCateEdit = document.querySelector("#cate-filter #cate-edit");
const closeCateEdit = document.querySelector("#close-cate-edit");
const editCateForm = document.querySelector("#edit-cate-filter")
console.log(openCateEdit);

openCateEdit.addEventListener("click", () => {
    cateFilterDiv.style.display = "block";
    fixedForm.style.display = "none";
})

closeCateEdit.addEventListener("click", () => {
    cateFilterDiv.style.display = "none";
    fixedForm.style.display = "block";
})

editCateForm.addEventListener("submit", () => {
    cateFilter.cate = editCateForm.category.value;
    cateFilter.status = true;
    localStorage.setItem('catefilter', JSON.stringify(cateFilter));
    // location.reload();
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




