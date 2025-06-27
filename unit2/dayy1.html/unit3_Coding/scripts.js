document.getElementById('registrationForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageEl = document.getElementById('message');

  if (!name || !email || !password) {
    messageEl.textContent = 'Please fill in all fields.';
    messageEl.style.color = 'red';
    return;
  }

  const userData = { name, email, password };

  try {
    const response = await fetch('https://mockapi.io/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      messageEl.textContent = 'Registration successful!';
      messageEl.style.color = 'green';
    } else {
      const errorData = await response.json();
      messageEl.textContent = errorData.message || 'Registration failed.';
      messageEl.style.color = 'red';
    }
  } catch (error) {
    messageEl.textContent = 'Network error. Please try again.';
    messageEl.style.color = 'red';
  }
});
