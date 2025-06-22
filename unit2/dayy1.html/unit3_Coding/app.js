   let currentUser = '';
   const storageKey = 'shoppingCarts';

function login() {
  const username = document.getElementById('username').value.trim();
  const error = document.getElementById('login-error');
  if (!username) {
    error.textContent = 'Username is required.';
    return;
  }

  const data = JSON.parse(localStorage.getItem(storageKey) || '{}');
  if (!data[username]) {
    data[username] = [];
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  currentUser = username;
  document.getElementById('user-display').textContent = username;
  document.getElementById('login').classList.add('hidden');
  document.getElementById('cart-section').classList.remove('hidden');
  error.textContent = '';
  loadCart();
}

function loadCart() {
  const data = JSON.parse(localStorage.getItem(storageKey));
  const cart = data[currentUser];
  const tbody = document.querySelector('#cart-table tbody');
  tbody.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.itemName}</td>
      <td>$${item.price}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
      </td>
      <td>$${item.price * item.quantity}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;
    tbody.appendChild(row);
    total += item.price * item.quantity;
  });

  document.getElementById('total-cost').textContent = total.toFixed(2);
}

function addItem() {
  const itemName = document.getElementById('item-name').value.trim();
  const price = parseFloat(document.getElementById('item-price').value);
  const quantity = parseInt(document.getElementById('item-quantity').value);
  const error = document.getElementById('add-error');

  if (!itemName || isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
    error.textContent = 'Enter valid item name, price and quantity.';
    return;
  }

  const data = JSON.parse(localStorage.getItem(storageKey));
  data[currentUser].push({ itemName, price, quantity });
  localStorage.setItem(storageKey, JSON.stringify(data));
  error.textContent = '';
  document.getElementById('item-name').value = '';
  document.getElementById('item-price').value = '';
  document.getElementById('item-quantity').value = '';
  loadCart();
}

function updateQuantity(index, newQuantity) {
  const quantity = parseInt(newQuantity);
  if (isNaN(quantity) || quantity <= 0) return;

  const data = JSON.parse(localStorage.getItem(storageKey));
  data[currentUser][index].quantity = quantity;
  localStorage.setItem(storageKey, JSON.stringify(data));
  loadCart();
}

function removeItem(index) {
  const data = JSON.parse(localStorage.getItem(storageKey));
  data[currentUser].splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(data));
  loadCart();
}



