const names = [];
for(let i=0;i<200;i++){
    names.push(`Name${i}`)
}

const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const loader = document.getElementById('loader');
const noresults = document.getElementById('noresults');
const backToTop = document.getElementById('backToTop');

const keystrokeCounter = document.getElementById('keystrore');
const debouncedCounter = document.getElementById('debouncedCount');

let keystrore = 0;
let debounce = 0;

function debounce(fn,delay){
    let timeout;
    return function(...args){
        loader.style.display = 'block';
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            loader.style.display = 'none';
            fn.apply(this,args);
        }, delay);
        

    } ;
}
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

function highlightMatch(name, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return name.replace(regex, "<span class='highlight'>$1</span>");
}

function performSearch(query) {
  debouncedSearches++;
  debouncedCounter.textContent = debouncedSearches;

  resultsDiv.innerHTML = "";
  if (!query) {
    noResults.style.display = "none";
    return;
  }

  const matches = names.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  if (matches.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  matches.forEach(match => {
    const div = document.createElement("div");
    div.innerHTML = highlightMatch(match, query);
    resultsDiv.appendChild(div);
  });
}


const debouncedSearch = debounce(function () {
  const query = searchInput.value.trim();
  performSearch(query);
}, 1000);

searchInput.addEventListener("input", () => {
  keystrokes++;
  keystrokeCounter.textContent = keystrokes;
  debouncedSearch();
});


window.addEventListener("scroll", throttle(() => {
  if (window.scrollY > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}, 500));

// Back to Top
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});