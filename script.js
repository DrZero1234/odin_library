let myLibrary = []
const LIBRARY_ELEM = document.querySelector(".library")
const BOOK_FORM_BTN = document.querySelector(".book-form-btn")
const BOOK_FORM = document.querySelector("#book-form")

const BOOK_TITLE = document.querySelector("#book-title")
const BOOK_AUTHOR = document.querySelector("#book-author")
const BOOK_YEAR = document.querySelector("#book-year")
const BOOK_PAGES = document.querySelector("#book-pages")

function Book(title, author, year, pages) {
  this.title = title;
  this.author = author
  this.year = year;
  this.pages = pages;
  this.read = false;
}

Book.prototype.addBookToLibrary = function() {
  myLibrary.push({
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

BOOK_FORM.addEventListener("onsubmit", () => {
  let book_elem = new Book(BOOK_TITLE.textContent, BOOK_AUTHOR.textContent, Number(BOOK_YEAR.textContent),BOOK_PAGES )
  book_elem.addBookToLibrary();
  displayBooks()
})


function displayBooks() {
  for (const book of myLibrary) {
    let book_div = document.createElement("div");
    book_div.className = "book"

    for (const key in book) {
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
    LIBRARY_ELEM.appendChild(book_div);


  }
  // Displays every book in the library one by one

  // Display the books in a table where every book has its own row

  // Add a button to every book so you can remove them from the library  One easy solution is giving them a data-attribute that corresponds to the index of the library array.

  // Add a button to each book to change its read status. The read status should be stored in the Book contructor
}


little_prince = new Book("The Little Prince", "Antoine de Saint-Exupéry", 1943, 140)
the_hobbit = new Book("The Hobbit", "J. R. R. Tolkien", 1937, 310)

console.log(little_prince)
for (let i = 0; i <= 10; i++) {
  
}
console.log(myLibrary)

displayBooks()