class Library {
  books;

  constructor(books) {
    this.books = books;
  }

  removeBook(removedBook) {
    this.books = this.books.filter((book) => book !== removedBook);
  }

  addBook(newBookTitle, newBookAuthor) {
    const book = {
      title: newBookTitle,
      author: newBookAuthor,
    };
    this.books.push(book);
  }
}

const library = new Library([]);

const addAwesomeBooksToLocalStorage = () => {
  const booksArrString = JSON.stringify(library.books);
  localStorage.setItem('awesomeBooks', booksArrString);
};

const showBooks = () => {
  const booksDiv = document.querySelector('.books');
  booksDiv.innerHTML = '';
  for (let i = 0; i < library.books.length; i += 1) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    booksDiv.appendChild(bookDiv);

    const titleParagraph = document.createElement('p');
    titleParagraph.classList.add('title');
    titleParagraph.textContent = library.books[i].title;
    bookDiv.appendChild(titleParagraph);

    const authorParagraph = document.createElement('p');
    authorParagraph.classList.add('author');
    authorParagraph.textContent = library.books[i].author;
    bookDiv.appendChild(authorParagraph);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      library.removeBook(library.books[i]);
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
  library.books = JSON.parse(booksArrString);
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
  library.addBook(title.value, author.value);
  addAwesomeBooksToLocalStorage();
  showBooks();
  title.value = '';
  author.value = '';
});
