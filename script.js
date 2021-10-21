/* eslint-disable no-undef */

const homeLink = document.querySelector('.home');

const listLink = document.querySelector('#list-link');
const addNewLink = document.querySelector('#add-new-link');
const contactLink = document.querySelector('#contact-link');

const booksListElem = document.querySelector('.list');
const addNewBookElem = document.querySelector('.add-new');
const contactElem = document.querySelector('.contact');

listLink.classList.add('active');

const displayHome = () => {
  booksListElem.classList.remove('display-none');
  addNewBookElem.classList.add('display-none');
  contactElem.classList.add('display-none');
  listLink.classList.add('active');
  addNewLink.classList.remove('active');
  contactLink.classList.remove('active');
};

listLink.addEventListener('click', displayHome);
homeLink.addEventListener('click', displayHome);

addNewLink.addEventListener('click', () => {
  booksListElem.classList.add('display-none');
  addNewBookElem.classList.remove('display-none');
  contactElem.classList.add('display-none');
  listLink.classList.remove('active');
  addNewLink.classList.add('active');
  contactLink.classList.remove('active');
});

contactLink.addEventListener('click', () => {
  booksListElem.classList.add('display-none');
  addNewBookElem.classList.add('display-none');
  contactElem.classList.remove('display-none');
  listLink.classList.remove('active');
  addNewLink.classList.remove('active');
  contactLink.classList.add('active');
});

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
    displayHome();
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
  if (library.books.length === 0) {
    booksDiv.style.display = 'none';
  } else {
    booksDiv.style.display = 'block';
  }
  for (let i = 0; i < library.books.length; i += 1) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    booksDiv.appendChild(bookDiv);

    const titleParagraph = document.createElement('p');
    titleParagraph.classList.add('title-author');
    titleParagraph.textContent = `"${library.books[i].title}" by ${library.books[i].author}`;
    bookDiv.appendChild(titleParagraph);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      library.removeBook(library.books[i]);
      addAwesomeBooksToLocalStorage();
      showBooks();
    };
    bookDiv.appendChild(removeBtn);
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

const getTime = () => {
  const now = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED_WITH_SECONDS);
  const dateElem = document.querySelector('.display-date');
  dateElem.textContent = now;
};

setInterval(getTime, 1000);
