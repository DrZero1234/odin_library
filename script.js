let myLibrary = []
const LIBRARY_ELEM = document.querySelector(".library")
const BOOK_FORM_BTN = document.querySelector(".book-form-btn")
const BOOK_FORM = document.querySelector("#book-form")


const BOOK_TITLE = document.querySelector("#book-title")
const BOOK_AUTHOR = document.querySelector("#book-author")
const BOOK_YEAR = document.querySelector("#book-year")
const BOOK_PAGES = document.querySelector("#book-pages")
const FORM_BUTTON = document.getElementById("submit-book")

document.addEventListener("DOMContentLoaded", () => {
  const BOOK_ARRAY = LIBRARY_ELEM.querySelectorAll("div")
})

let form_data = new FormData(BOOK_FORM)
console.log(form_data)

function Book(title, author, year, pages) {
  this.title = title;
  this.author = author
  this.year = year;
  this.pages = pages;
  this.read = false;
}

Book.prototype.addBookToLibrary = function() {
  return myLibrary.push({
    "title": this.title,
    "author": this.author,
    "year": this.year,
    "pages": this.pages,
    "read": this.read
  });
}

BOOK_FORM_BTN.addEventListener("click", () => {
  if (BOOK_FORM.className === "inactive") {
    BOOK_FORM.className = "active"
  } else {
    BOOK_FORM.className = "inactive"
  }
})

/*

BOOK_FORM.addEventListener("onsubmit", () => {
  let book_elem = new Book(BOOK_TITLE.textContent, BOOK_AUTHOR.textContent, Number(BOOK_YEAR.textContent),BOOK_PAGES )
  book_elem.addBookToLibrary();
  displayBooks()
})

*/

function displayBooks() {
  LIBRARY_ELEM.innerHTML = ""
  for (let book of myLibrary) {
    // Generating the html card for every book in the library
    let book_div = document.createElement("div");
    book_div.setAttribute("data-index", myLibrary.indexOf(book))
    book_div.className = "book"
    // TODObook_div.style.backgroundColor = getRandomColor()
    let remove_button = document.createElement("button")
    remove_button.className = "remove-book"
    remove_button.innerHTML = "Remove"
    remove_button.addEventListener("click", () => {
      myLibrary.splice(myLibrary.indexOf(book),1)
      displayBooks();
    })

    // Filling the card with the book data
    for (let key in book) {
      if (key !== "read") {
        let new_cell = document.createElement("h2");
        if (key === "pages") {
          new_cell.textContent = `${book[key]} pages`;
        } else {
          new_cell.textContent = book[key];
        }
        book_div.appendChild(new_cell)
      } 
    }
    book_div.appendChild(remove_button)
    LIBRARY_ELEM.appendChild(book_div);
  }
  // Displays every book in the library one by one

  // Display the books in a table where every book has its own row

  // Add a button to every book so you can remove them from the library  One easy solution is giving them a data-attribute that corresponds to the index of the library array.

  // Add a button to each book to change its read status. The read status should be stored in the Book contructor
}

FORM_BUTTON.addEventListener("click", ()=> {
  new_book = new Book(BOOK_TITLE.value, BOOK_AUTHOR.value,+BOOK_YEAR.value,+BOOK_PAGES.value)
  new_book.addBookToLibrary();
  displayBooks();
})

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}





little_prince = new Book("The Little Prince", "Antoine de Saint-Exupéry", 1943, 140)
the_hobbit = new Book("The Hobbit", "J. R. R. Tolkien", 1937, 310)

console.log(little_prince)

little_prince.addBookToLibrary()
the_hobbit.addBookToLibrary()
console.log(myLibrary)

displayBooks()