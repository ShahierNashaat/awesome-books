let booksArr = [];

function addAwesomeBooksToLocalStorage() {
  const booksArrString = JSON.stringify(booksArr);
  localStorage.setItem('awesomeBooks', booksArrString);
}

function getAwesomeBooksFromLocalStorage() {
  const booksArrString = localStorage.getItem('awesomeBooks');
  booksArr = JSON.parse(booksArrString);
}

if(localStorage.getItem('awesomeBooks') == null) {
  addAwesomeBooksToLocalStorage();
} else {
  getAwesomeBooksFromLocalStorage();
}

function addBook(bookTitle, bookAuthor) {
  const book = {
    title: bookTitle,
    author: bookAuthor,
  };

  booksArr.push(book);
  addAwesomeBooksToLocalStorage();
}

function removeBook(removedBook) {
  booksArr.filter(book => book !== removedBook);
  addAwesomeBooksToLocalStorage();
}

const addBtn = document.querySelector('#add-btn');

addBtn.addEventListener('click', ()=>{
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  addBook(title, author);
});

const removeBtns = document.querySelectorAll('.books .remove');

for (let i = 0; i < removeBtns.length; i += 1) {
  removeBtns[i].addEventListener('click', ()=>{
    removeBook(booksArr[i]);
  });
}