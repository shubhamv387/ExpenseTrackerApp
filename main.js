showOnReload();
// if (expenseList.childElementCount == 0) expenseList.classList.remove("p-2");

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const expenseAmount = document.getElementById("amount");
  const description = document.getElementById("description");
  const category = document.getElementById("category");

  //creating a unique ID for each Expense Obj
  let keyId = new Date().getTime();
  const ExpenseObj = {
    expenseKey: `Key${keyId}`,
    expenseAmount: expenseAmount.value,
    description: description.value,
    category: category.value,
  };

  // storing the details in the local storage with the unique key ID
  localStorage.setItem(`Key${keyId}`, JSON.stringify(ExpenseObj));
  showUserOnScreen(ExpenseObj);

  // resetting the input fields after submission
  expenseAmount.value = "";
  description.value = "";
  category.value = "";
});

function showUserOnScreen(ExpenseObj) {
  const expenseList = document.getElementById("expenseList");
  expenseList.classList.add("p-2");

  //creating a new li element
  const expense = document.createElement("li");
  expense.className = "mb-4";

  expense.innerHTML = `<span class = "d-block mb-2 text-capitalize"> <span class = "fw-bold"> Amount:</span> ${ExpenseObj.expenseAmount} INR <br> <span class = "fw-bold"> Description:</span> ${ExpenseObj.description} <br> <span class = "fw-bold"> Category:</span> ${ExpenseObj.category} <span>`;

  //Adding Edit Btn to each li element
  let editBtn = document.createElement("button");
  editBtn.className = "btn btn-success d-inline-block me-3 ";
  editBtn.appendChild(document.createTextNode("EDIT"));
  expense.appendChild(editBtn);

  editBtn.addEventListener("click", () => {
    document.getElementById("amount").value = ExpenseObj.expenseAmount;
    document.getElementById("description").value = ExpenseObj.description;
    document.getElementById("category").value = ExpenseObj.category;
    document.getElementById("amount").focus();
    expenseList.removeChild(expense);
    if (expenseList.childElementCount == 0) expenseList.classList.remove("p-2");
    localStorage.removeItem(ExpenseObj.expenseKey);
  });

  //Adding delete Btn to each li element
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-dark d-inline-block ";
  deleteBtn.appendChild(document.createTextNode("DELETE"));

  expense.append(deleteBtn);

  //Appening the li element to the ul element
  expenseList.append(expense);

  deleteBtn.addEventListener("click", () => {
    localStorage.removeItem(ExpenseObj.expenseKey);
    expenseList.removeChild(expense);
    if (expenseList.childElementCount == 0) expenseList.classList.remove("p-2");
  });
}

function showOnReload() {
  for (let i = 0; i < localStorage.length; i++) {
    var showDetails = JSON.parse(localStorage.getItem(localStorage.key(i)));
    showUserOnScreen(showDetails);
  }
}
