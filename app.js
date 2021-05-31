// Listen for submit event
const loanForm = document.getElementById('loan-form');
loanForm.addEventListener('submit', calculateResults);

function calculateResults(event) {
  // UI elements
  const amountEl = document.getElementById('amount');
  const interestEl = document.getElementById('interest');
  const yearsEl = document.getElementById('years');
  const monthlyPaymentEl = document.getElementById('monthly-payment');
  const totalPaymentEl = document.getElementById('total-payment');
  const totalInterestEl = document.getElementById('total-interest');
  
  const principal = parseFloat(amountEl.value);
  const calculatedInterest = parseFloat(interestEl.value) / 100 / 12;
  const installments = parseFloat(yearsEl.value) * 12;

  const x = Math.pow(1 + calculatedInterest, installments);
  const monthlyPayment = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthlyPayment)) {
    monthlyPaymentEl.value = monthlyPayment.toFixed(2);
    totalPaymentEl.value = (monthlyPayment * installments).toFixed(2);
    totalInterestEl.value = ((monthlyPayment * installments) - principal).toFixed(2);
  } else {
    showError('Please check your numbers');
  }

  event.preventDefault();
}

function showError(error) {
  const errorEl = document.createElement('div');
  const cardEl = document.querySelector('.card');
  const headingEl = document.querySelector('.heading');
  errorEl.className = 'alert alert-danger';
  errorEl.appendChild(document.createTextNode(error));
  // insert the error message in the card, before the heading
  cardEl.insertBefore(errorEl, headingEl);
  // clear error after 3 secons
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}

window.onload = () => {
  document.getElementById('amount').value = '';
  document.getElementById('interest').value = '';
  document.getElementById('years').value = '';
  document.getElementById('monthly-payment').value = '';
  document.getElementById('total-payment').value = '';
  document.getElementById('total-interest').value = '';
};