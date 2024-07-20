window.onload = () => displayFullList();


//html element assignments
const displayData = document.getElementById('displayData');

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
    <div id="displayData">
        <p>Title: ${title}</p>
        <p>Published: ${pub_year}</p>
      </div>
      `
  }).join('~~~~~~~~~~~~~~~~~~~~~~~~~~');

  displayData.innerHTML = bookList;
  displayData.style.color = 'gray';
}

