const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalAmountEl = document.getElementById('totalAmount');
const categorySelect = document.getElementById('category');
const customCategoryInput = document.getElementById('customCategory');

let expenses = [];

// Show/hide custom category input based on selection
categorySelect.addEventListener('change', () => {
  if (categorySelect.value === 'Others') {
    customCategoryInput.style.display = 'block';
    customCategoryInput.required = true;
  } else {
    customCategoryInput.style.display = 'none';
    customCategoryInput.required = false;
    customCategoryInput.value = '';
  }
});

function updateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmountEl.textContent = `₹${total.toFixed(2)}`;
}

function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${expense.description}</td>
      <td>${expense.category}</td>
      <td>₹${expense.amount.toFixed(2)}</td>
      <td><button aria-label="Delete expense" data-index="${index}" class="delete-btn">✖</button></td>
    `;

    expenseList.appendChild(tr);
  });
  updateTotal();
}

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = document.getElementById('description').value.trim();
  let category = categorySelect.value;
  const amountValue = document.getElementById('amount').value;
  const amount = parseFloat(amountValue);

  // Handle custom category if "Others" is selected
  if (category === 'Others') {
    category = customCategoryInput.value.trim();
    if (!category) {
      alert('Please enter a custom category.');
      return;
    }
  }

  // Validation
  if (!description) {
    alert('Please enter a description.');
    return;
  }

  if (!category) {
    alert('Please select a category.');
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount greater than zero.');
    return;
  }

  // Add expense to array and re-render
  expenses.push({ description, category, amount });
  renderExpenses();

  // Reset form
  expenseForm.reset();
  customCategoryInput.style.display = 'none';
  customCategoryInput.required = false;
});

// Event delegation for delete buttons
expenseList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    expenses.splice(index, 1);
    renderExpenses();
  }
});