// import { searchDatabase } from '../database';

window.onload = () => displayFullList();


//html element assignments
const displayData = document.getElementById('display-data');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//button assignments
const fullList = document.getElementById('fullList');

//all titles button funcs
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

//forms
const title = searchInput.value;
// searchForm.action = `./search/${title}`;

searchForm.onsubmit = (e) => {  
  getSearchResults();  
  e.preventDefault();
}

async function getSearchResults() {  
  const response = await fetch(`./search/${title}`)
  const data = await response.json();
  return data;
}

async function displaySearchResults() {
  const payload = await getSearchResults();  
  displayData.innerHTML = payload; 
  };

