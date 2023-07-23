showOnReload();

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const expenseAmount = document.getElementById("amount");
  const description = document.getElementById("description");
  const category = document.getElementById("category");

  let keyId = new Date().getTime();
  const ExpenseObj = {
    expenseKey: `Key${keyId}`,
    expenseAmount: expenseAmount.value,
    description: description.value,
    category: category.value,
  };

  localStorage.setItem(`Key${keyId}`, JSON.stringify(ExpenseObj));
  showUserOnScreen(ExpenseObj);

  expenseAmount.value = "";
  description.value = "";
  category.value = "";
});

function showUserOnScreen(ExpenseObj) {
  const expenseList = document.getElementById("expenseList");

  const expense = document.createElement("li");

  expense.innerHTML = `<span class = "d-block mb-2 text-capitalize"> <span class = "fw-bold"> Amount:</span> ${ExpenseObj.expenseAmount} INR <br> <span class = "fw-bold"> Description:</span> ${ExpenseObj.description} <br> <span class = "fw-bold"> Category:</span> ${ExpenseObj.category} <span>`;

  //Adding Edit Btn
  let editBtn = document.createElement("button");
  editBtn.className = "btn btn-success d-inline-block me-3 mb-3";
  editBtn.appendChild(document.createTextNode("EDIT"));
  expense.appendChild(editBtn);

  editBtn.addEventListener("click", () => {
    document.getElementById("amount").value = ExpenseObj.expenseAmount;
    document.getElementById("description").value = ExpenseObj.description;
    document.getElementById("category").value = ExpenseObj.category;
    document.getElementById("amount").focus();
    expenseList.removeChild(expense);
    localStorage.removeItem(ExpenseObj.expenseKey);
  });

  //Adding delete Btn
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-dark d-inline-block mb-3";
  deleteBtn.appendChild(document.createTextNode("DELETE"));

  expense.append(deleteBtn);
  expenseList.append(expense);

  deleteBtn.addEventListener("click", () => {
    localStorage.removeItem(ExpenseObj.expenseKey);
    expenseList.removeChild(expense);
  });
}

function showOnReload() {
  for (let i = 0; i < localStorage.length; i++) {
    var showDetails = JSON.parse(localStorage.getItem(localStorage.key(i)));
    showUserOnScreen(showDetails);
  }
}
