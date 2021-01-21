let myLibrary = [];

function setMyLibrary() {
  if(localStorage.getItem('myLibrary') !== null) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    loadBooks();
  } else {
    myLibrary = [];
  }
}

const btnNewBook = document.querySelector(".submit-new-book");
const titleInput = document.querySelector(".title-input");
const descriptionInput = document.querySelector(".description-input");
const pagesInput = document.querySelector(".pages-input");
const readInput = document.querySelector(".read-input");
const btnFormClose = document.querySelector(".btn-form-close");
const newBookForm = document.querySelector(".new-book-form");
const btnAddNewBook = document.querySelector(".btn-add-new-book");

class Book {
  constructor(title, description, pages, readSwitch) {
    this.title = title;
    this.description = description;
    this.pages = pages;
    this.readSwitch = readSwitch;
  }
}

setMyLibrary();

btnNewBook.addEventListener("click", createBook);
btnFormClose.addEventListener("click", closeForm);
btnAddNewBook.addEventListener("click", openForm);

function closeForm() {
  newBookForm.style.display = "none";
}

function openForm() {
  newBookForm.style.display = "flex";
}

function loadBooks() {
  myLibrary.forEach( (book) => {
    addCard(book);
  })
}

function saveLocal(myLibrary) {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function createBook() {
  if(titleInput.value === '' || descriptionInput.value === '' || pagesInput.value === ''){
    alert('You are missing some data. Please fill all fields');
  } else {
    let beenRead = readInput.checked ? true : false;
    let book = new Book(
      titleInput.value,
      descriptionInput.value,
      pagesInput.value,
      beenRead
    );
    [titleInput, descriptionInput, pagesInput].forEach(function (x) {
      x.value = "";
    });
    readInput.checked = null;
    myLibrary.push(book);
    saveLocal(myLibrary);
    addCard(book);
  }
}

function addCard(book) {
  const mainContainer = document.querySelector(".library-container");

  let container = document.createElement("div");
  container.className = "book-card";
  container.setAttribute('data-pos', myLibrary.indexOf(book));

  let title = document.createElement("h1");
  title.textContent = book.title;

  let description = document.createElement("p");
  description.textContent = book.description;

  let pages = document.createElement("p");
  pages.textContent = "Has " + book.pages + " pages";
  pages.className = "text-light";

  let readOrNot = document.createElement("p");
  readOrNot.className = 'read-or-not-txt';
  readOrNot.textContent =
    book.readSwitch === true ? "Has been read." : "Has not been read.";

  let readBtn = document.createElement("button");
  readBtn.className = "btn-read-unread";
  readBtn.textContent =
    book.readSwitch === true ? "Unread" : "Read";
  readBtn.addEventListener("click", changeReadBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-delete";
  deleteBtn.textContent = "Delete Book";
  deleteBtn.addEventListener("click", deleteBook);

  let readTickImg = document.createElement('img');
  readTickImg.className = 'tick-img';
  readTickImg.src = 'check.svg';
  if(book.readSwitch === true){
    readTickImg.style.display = 'block';
  } else {
    readTickImg.style.display = "none";
  }
  
  container.appendChild(readTickImg);
  container.append(title, description, pages, readOrNot, readBtn, deleteBtn);

  mainContainer.appendChild(container);
}

function changeReadBtn(e) {
  let currentBookId = e.target.offsetParent.getAttribute('data-pos');
  let currentBook = myLibrary[currentBookId];
  let tickImg = e.target.offsetParent.querySelector('.tick-img');
  if (e.target.textContent === 'Read') {
    e.target.textContent = "Unread";
    e.target.offsetParent.querySelector('.read-or-not-txt').textContent = "Has been read.";
    currentBook.readSwitch = true;
    saveLocal(myLibrary);
    tickImg.style.display = 'block';
  } else {
    e.target.textContent = "Read";
    e.target.offsetParent.querySelector(".read-or-not-txt").textContent =
      "Has not been read.";
    currentBook.readSwitch = false;
    saveLocal(myLibrary);
    tickImg.style.display = 'none';
  }
}

function deleteBook(e) {
  const bookIndex = e.target.offsetParent.getAttribute('data-pos');
  myLibrary.splice(bookIndex, 1);
  saveLocal(myLibrary);
  e.target.offsetParent.remove();
}
