showOnReload();

const form = document.getElementById("form");
let keyId = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  keyId++;

  const expenseAmount = document.getElementById("amount");
  const description = document.getElementById("description");
  const category = document.getElementById("category");

  if (
    expenseAmount.value == "" ||
    description.value == "" ||
    category.value == ""
  ) {
    alert("All Fields are required");
  } else {
    const ExpenseObj = {
      expenseKey: `Key${keyId}`,
      expenseAmount: expenseAmount.value,
      description: description.value,
      category: category.value,
    };

    localStorage.setItem(`Key${keyId}`, JSON.stringify(ExpenseObj));
    showUserOnScreen(ExpenseObj);

    // expenseAmount.value == "";
    // description.value == "";
    // category.value == "";
  }
});

function showUserOnScreen(ExpenseObj) {
  const expenseList = document.getElementById("expenseList");

  const expense = document.createElement("li");
  expense.className = "expense mt-2";

  expense.innerHTML = `<span class = "d-block"> ${ExpenseObj.expenseAmount} - ${ExpenseObj.description} - ${ExpenseObj.category} <span>`;

  //Adding Edit Btn
  let editBtn = document.createElement("button");
  editBtn.className = "btn btn-success d-inline-block me-3";
  editBtn.appendChild(document.createTextNode("EDIT"));
  expense.appendChild(editBtn);

  editBtn.addEventListener("click", () => {
    document.getElementById("amount").value = ExpenseObj.expenseAmount;
    document.getElementById("description").value = ExpenseObj.description;
    document.getElementById("category").value = ExpenseObj.category;
    document.getElementById("amount").focus();
    expenseList.removeChild(expense);
  });

  //Adding delete Btn
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-dark d-inline-block";
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
