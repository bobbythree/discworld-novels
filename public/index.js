//html element assignments
const displayData = document.getElementById('display-data');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//button assignments
const fullListBtn = document.getElementById('full-list-btn');
const subseriesBtn = document.getElementById('subseries-btn');
const characterBtn = document.getElementById('character-btn');

//all titles button funcs
fullListBtn.onclick = () => displayFullList();

async function fetchAllBooks() {
  let url = '/books';
  const response = await fetch(url);
  const data = await response.json();
  return data; 
}

async function displayFullList() {
  const payload = await fetchAllBooks();
  let bookList = payload.map((book) => {
    const { title, pub_year } = book;

    return `
    <div id="display-data">
        <p>Title: ${title}</p>
        <p>Published: ${pub_year}</p>
      </div>
      `
  }).join('~~~~~~~~~~~~~~~~~~~~~~~~~~');

  displayData.innerHTML = bookList;
  displayData.style.color = 'gray';
}

//titles and subsreies btn funcs
subseriesBtn.onclick = () => displayAllSubseries();

async function fetchAllSubseries() {
  let url = '/subseries';
  const response = await fetch(url);
  const data = await response.json();
  return data; 
}

async function displayAllSubseries() {
  const payload = await fetchAllSubseries();
  let bookList = payload.map((book) => {
    const { title, subseries } = book;

    return `
    <div id="display-data">
        <p>Title: ${title}</p>
        <p>Subseries: ${subseries}</p>
      </div>
      `
  }).join('~~~~~~~~~~~~~~~~~~~~~~~~~~');

  displayData.innerHTML = bookList;
  displayData.style.color = 'gray';
}

//forms
// searchForm.action = `./search/${title}`;

searchForm.onsubmit = (e) => {   
  const title = searchInput.value;
  e.preventDefault();
  console.log(title)
  
}

async function getSearchResults(title) {  
  const response = await fetch(`./search/${title}`)
  const data = await response.json();
  return data;
}

// async function displaySearchResults(title) {
//   const payload = await getSearchResults(title);  
//   displayData.innerHTML = payload; 
//   };

