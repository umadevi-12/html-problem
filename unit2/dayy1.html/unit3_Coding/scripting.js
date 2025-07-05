const img = document.getElementById("slider-image");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideText = document.getElementById("slideNumber");

let slide = 1;
let isThrottled = false;
let clickCount = 0;
let clickTimer = null;

function updateImage(direction) {
  if (isThrottled) return;

  isThrottled = true;
  setTimeout(() => {
    isThrottled = false;
    clickCount = 0; 
  }, 1000);

  if (direction === "next") {
    slide++;
  } else if (direction === "prev" && slide > 1) {
    slide--;
  }

  img.src = `https://picsum.photos/600/400?random=${Date.now()}`;
  slideText.innerText = `Slide: ${slide}`;
}

function handleClick(direction) {
  clickCount++;

  if (!clickTimer) {
    clickTimer = setTimeout(() => {
      clickCount = 0;
      clickTimer = null;
    }, 1000);
  }

  if (clickCount > 3) {
    alert("Chill chill, loading it!!");
    return;
  }

  updateImage(direction);
}

nextBtn.addEventListener("click", () => handleClick("next"));
prevBtn.addEventListener("click", () => handleClick("prev"));
