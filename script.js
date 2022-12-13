// :::::::::: class :::::::::::
class Item {
  constructor(name, brand, price, date, type, discount) {
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.date = date;
    this.type = type;
    this.discount = discount;
    this.details = function () {
      return `Item Details:<br>name : ${this.name}.<br>brand : ${this.brand}.<br>date : ${this.date}.<br>type : ${this.type}.<br>disount : ${this.discount}.`;
    };
    this.table = function () {
      return [
        this.name,
        this.brand,
        this.price,
        this.date,
        this.type,
        this.discount,
        `<button id="remove${id}" onclick='remove(this)' class="remove">Remove</button><button onclick='edit(this);' id="add${id}" class="add">Edite</button>`,
      ];
    };
  }
}
// ::::::::::::: localstorag relod :::::::::::
function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
  while (i--) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return values;
}
window.addEventListener("DOMContentLoaded", function () {
  allStorage();
  for (let i = 0; i < allStorage().length; i++) {
    save(allStorage()[i]);
    id++;
  }
  sortTable();
});
// :::::::::::::: validation helpers ::::::::::::
function checkP() {
  let p = document.querySelectorAll("form p");
  let result = true;
  for (let i = 0; i < p.length; i++) {
    if (p[i].classList.contains("erore")) {
      return (result = false);
    }
  }
  return result;
}
function save(table) {
  let row = document.createElement("tr");
  row.setAttribute("id", "tr" + id);
  document.getElementById("table").appendChild(row);
  for (let i = 0; i < table.length; i++) {
    let cell = document.createElement("td");
    cell.setAttribute("id", "td" + id + i);
    document.getElementById("tr" + id).appendChild(cell);
    document.getElementById("td" + id + i).innerHTML = table[i];
  }
}
function resetform() {
  let name = (document.getElementById("name").value = "");
  let brand = (document.getElementById("brand").value = "");
  let price = (document.getElementById("price").value = "");
  let date = (document.getElementById("production_date").value = "");
  let select = (document.getElementById("type").value = "");
  let discount = document.getElementsByName("discount");
  for (let i = 0; i < discount.length; i++) {
    discount[i].checked = false;
  }
}
// :::::::::::::: validation function ::::::::::::
function checkName(name) {
  let nameRex = /^(^[a-z]+['-\s]?[a-z]+)$/gi;
  let validename = nameRex.test(name);
  return validename;
}
function checkbrand(brand) {
  let brandRex = /^(^[a-z]+['-\s]?[a-z]+)$/gi;
  let validebrand = brandRex.test(brand);
  return validebrand;
}
function checkprice(price) {
  let priceRex = /^(^\d+([,.]?\d+$)?)$/;
  let valideprice = priceRex.test(price);
  return valideprice;
}
function getpromo(listpromo) {
  for (let i = 0; i < listpromo.length; i++) {
    if (listpromo[i].checked) {
      return listpromo[i].value;
    }
  }
}
// :::::::: input :::::::
function inputvalue() {
  let name = document.getElementById("name").value;
  let brand = document.getElementById("brand").value;
  let price = document.getElementById("price").value;
  let date = document.getElementById("production_date").value;
  let select = document.getElementById("type").value;
  let discount = document.getElementsByName("discount");
  let item;
  return (item = new Item(
    name,
    brand,
    price,
    date,
    select,
    getpromo(discount)
  ));
  
}
// :::::::::: date max value ::::::
production_date.max = new Date().toLocaleDateString("en-ca");
// :::::::::: validation :::::::::
function validation(item) {
  // validation
  checkName(item.name);
  checkbrand(item.brand);
  checkprice(item.price);
  // condition
  let check = true;
  while (check) {
    if (checkName(item.name)) {
      document.getElementById("invname").classList.remove("erore");
    } else {
      document.getElementById("invname").classList.add("erore");
    }
    if (checkbrand(item.brand)) {
      document.getElementById("invbrand").classList.remove("erore");
    } else {
      document.getElementById("invbrand").classList.add("erore");
    }
    if (checkprice(item.price)) {
      document.getElementById("invprice").classList.remove("erore");
    } else {
      document.getElementById("invprice").classList.add("erore");
    }
    if (item.date == "") {
      document.getElementById("invdate").classList.add("erore");
    } else {
      document.getElementById("invdate").classList.remove("erore");
    }
    if (item.discount == undefined) {
      document.getElementById("invdis").classList.add("erore");
    } else {
      document.getElementById("invdis").classList.remove("erore");
    }
    if (item.select == "") {
      document.getElementById("invselc").classList.add("erore");
    } else {
      document.getElementById("invselc").classList.remove("erore");
    }
    check = false;
  }
  return item;
}
// ::::::::::::sort:::::::::::::::
function sortTable() {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
// ::::::::::::: add :::::::::::::
let id = 0;
document.getElementById("button").onclick = function (e) {
  validation(inputvalue());
  checkP();
  if (checkP() === true) {
    id++;
    save(inputvalue().table());
    modaleadd();
    document.getElementById("hide").onclick = function () {
      document.getElementById("modaleadd").style.display = "none";
    };
    window.localStorage.setItem(
      inputvalue().name,
      JSON.stringify(inputvalue().table())
    );
    resetform();
    sortTable();
  } else {
    e.preventDefault();
  }
};
function modaleadd() {
  document.getElementById("modaleadd").style.display = "block";
  document.getElementById("modaleadd").style.display = "grid";
  document.getElementById("mod-add").innerHTML = inputvalue().details();
}
// :::::::::::: delte ::::::::::::
function remove(that) {
  modaleremove();
  document.getElementById("delete").onclick = function () {
    if ((document.getElementById("delete").value = "delete")) {
      let deletedata = that.closest("tr");
      let alldata = deletedata.querySelectorAll("td");
      let table = new Array();
      alldata.forEach((data) => table.push(data.innerHTML));
      console.log(table[0]);
      removstorag(table[0]);
      that.closest("tr").remove();
      document.getElementById("modaleremove").style.display = "none";
    }
  };
}
function removstorag(that) {
  window.localStorage.removeItem(that);
}
document.getElementById("cancel").onclick = function () {
  document.getElementById("modaleremove").style.display = "none";
};
function modaleremove() {
  document.getElementById("modaleremove").style.display = "block";
  document.getElementById("modaleremove").style.display = "grid";
}
// ::::::::::: edite ::::::::::::::
function edit(that) {
  let save = document.getElementById("save");
  let button = document.getElementById("button");
  save.style.display = "block";
  button.style.display = "none";
  let data = that.closest("tr");
  let td = data.querySelectorAll("td");
  let table = [];
  let inputtable = [];
  td.forEach((e) => table.push(e.innerHTML));
  let input = document.querySelectorAll("form input,select");
  input.forEach((e) => inputtable.push(e));
  for (let i = 0; i < table.length - 2; i++) {
    inputtable[i].value = table[i];
  }
  if (table[5] === "yes") {
    document.getElementById("yes").checked = true;
  } else if (table[5] === "no") {
    document.getElementById("no").checked = true;
  }
  save.onclick = function () {
    validation(inputvalue());
    checkP();
    if (checkP() === true) {
      for (let i = 0; i < inputvalue().table().length - 1; i++) {
        td[i].innerHTML = inputvalue().table()[i];
      }
    }
    save.style.display = "none";
    button.style.display = "block";
    removstorag(table[0]);
    window.localStorage.setItem(
      inputvalue().name,
      JSON.stringify(inputvalue().table())
    );
    sortTable();
    resetform();
  };
}