function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString(undefined, options);

  clock.textContent = `${time} ${date}`;
}

setInterval(updateClock, 1000);
updateClock();