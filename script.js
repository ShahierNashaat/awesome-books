let booksArr = [];

const removeBook = (bookIndex) => {
  booksArr = booksArr.filter((book) => book !== booksArr[bookIndex]);
};

const addBook = (bookTitle, bookAuthor) => {
  const book = {
    title: bookTitle,
    author: bookAuthor,
  };

  booksArr.push(book);
};

const addAwesomeBooksToLocalStorage = () => {
  const booksArrString = JSON.stringify(booksArr);
  localStorage.setItem('awesomeBooks', booksArrString);
};

const showBooks = () => {
  const booksDiv = document.querySelector('.books');
  booksDiv.innerHTML = '';
  for (let i = 0; i < booksArr.length; i += 1) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    booksDiv.appendChild(bookDiv);

    const titleParagraph = document.createElement('p');
    titleParagraph.classList.add('title');
    titleParagraph.textContent = booksArr[i].title;
    bookDiv.appendChild(titleParagraph);

    const authorParagraph = document.createElement('p');
    authorParagraph.classList.add('author');
    authorParagraph.textContent = booksArr[i].author;
    bookDiv.appendChild(authorParagraph);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      removeBook(i);
      addAwesomeBooksToLocalStorage();
      showBooks();
    };
    bookDiv.appendChild(removeBtn);

    const lineHr = document.createElement('hr');
    bookDiv.appendChild(lineHr);
  }
};

const getAwesomeBooksFromLocalStorage = () => {
  const booksArrString = localStorage.getItem('awesomeBooks');
  booksArr = JSON.parse(booksArrString);
  showBooks();
};

if (localStorage.getItem('awesomeBooks') == null) {
  addAwesomeBooksToLocalStorage();
} else {
  getAwesomeBooksFromLocalStorage();
}

const addBtn = document.querySelector('#add-btn');

addBtn.addEventListener('click', () => {
  const title = document.querySelector('#title-input');
  const author = document.querySelector('#author-input');
  addBook(title.value, author.value);
  addAwesomeBooksToLocalStorage();
  showBooks();
  title.value = '';
  author.value = '';
});
