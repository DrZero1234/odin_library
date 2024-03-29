console.log(localStorage);




const LIBRARY_ELEM = document.querySelector(".library");
const BOOK_FORM_BTN = document.querySelector(".book-form-btn");
const BOOK_FORM = document.querySelector("#book-form");

const BOOK_TITLE = document.querySelector("#book-title");
const BOOK_AUTHOR = document.querySelector("#book-author");
const BOOK_YEAR = document.querySelector("#book-year");
const BOOK_PAGES = document.querySelector("#book-pages");
const FORM_BUTTON = document.getElementById("submit-book");
const FORM_CHECK = document.getElementById("book-read");

document.addEventListener("DOMContentLoaded", () => {
  const BOOK_ARRAY = LIBRARY_ELEM.querySelectorAll("div");
});

let form_data = new FormData(BOOK_FORM);
console.log(form_data);

let Book = class {
  constructor(title, author, year, pages, read) {
    this.id = Date.now();
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
  }

  addBookToLibrary = () => {
    localStorage.setItem(this.id, JSON.stringify(this));
  };
};

BOOK_FORM_BTN.addEventListener("click", () => {
  if (BOOK_FORM.className === "inactive") {
    BOOK_FORM.className = "active";
  } else {
    BOOK_FORM.className = "inactive";
  }
});

function displayBooks() {
  // Generating the book "cards"
  LIBRARY_ELEM.innerHTML = "";
  Object.keys(localStorage)
    .reverse()
    .forEach((key) => {
      book = JSON.parse(localStorage.getItem(key));
      console.log(`Book: ${book}`);
      let book_div = document.createElement("div");
      book_div.className = "book";
      book_div.id = book.id;
      let paper_div = document.createElement("div");
      paper_div.id = "paper";
      book_div.appendChild(paper_div)

      let remove_button = document.createElement("button");
      remove_button.className = "remove-book";
      remove_button.innerHTML = "Remove";
      remove_button.addEventListener("click", () => {
        remove_book(key);
      });

      Object.keys(book).forEach((book_data) => {
        if (book_data != "id" && book_data != "read") {
          let new_cell = document.createElement("h2");
          if (book_data === "pages") {
            new_cell.textContent = `${book[book_data]} pages`;
          } else {
            new_cell.textContent = book[book_data];
          }
          book_div.appendChild(new_cell);
        } else if (book_data === "read") {
          let i;
          let checkbox_label = document.createElement("label");
          checkbox_label.setAttribute("for", "cbox" + book.id);
          checkbox_label.textContent = "Read ";

          let checkbox = document.createElement("input");
          checkbox.setAttribute("type", "checkbox");
          checkbox.id = "cbox" + book.id;

          // DOES NOT WORK

          checkbox.addEventListener("click", () => {
            let book_elem = localStorage.getItem(key);
            let book_json = JSON.parse(book_elem);
            if (book_json.read) {
              book_json.read = false;
            } else {
              book_json.read = true
            }
            localStorage.setItem(key, JSON.stringify(book_json))
          })


          if (book.read === true) {
            checkbox.checked = true;
          }

          checkbox_label.appendChild(checkbox);
          book_div.appendChild(checkbox_label);
        }
      });

      book_div.appendChild(remove_button);
      LIBRARY_ELEM.appendChild(book_div);
    });
}

let remove_book = (key) => {
  if (Object.keys(localStorage).includes(key)) {
    item = localStorage.getItem(key);
    localStorage.removeItem(key);
    displayBooks();
  } else {
    alert("This key does not exist");
    return;
  }
};

BOOK_FORM.addEventListener("submit", () => {
  if (FORM_CHECK.checked) {
    read = true;
  } else {
    read = false;
  }
  new_book = new Book(
    BOOK_TITLE.value,
    BOOK_AUTHOR.value,
    +BOOK_YEAR.value,
    +BOOK_PAGES.value,
    read
  );
  new_book.addBookToLibrary();
  displayBooks();
});

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



document.addEventListener("DOMContentLoaded", () => {
  displayBooks();
})

