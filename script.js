let myLibrary = []
const LIBRARY_ELEM = document.querySelector(".library")
const BOOK_FORM_BTN = document.querySelector(".book-form-btn")
const BOOK_FORM = document.querySelector("#book-form")

function Book(title, author, year) {
  this.title = title;
  this.author = author
  this.year = year;
  this.read = false;
}

Book.prototype.addBookToLibrary = function() {
  myLibrary.push({
    "title": this.title,
    "author": this.author,
    "year": this.year,
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

function displayBooks() {
  for (const book of myLibrary) {
    let book_div = document.createElement("div");
    book_div.className = "book"

    for (const key in book) {
      if (key !== "read") {
        let new_cell = document.createElement("h2");
        new_cell.textContent = book[key];
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

little_prince = new Book("The Little Prince", "Antoine de Saint-Exupéry", 1943)
the_hobbit = new Book("The Hobbit", "J. R. R. Tolkien", 1937)

console.log(little_prince)
for (let i = 0; i <= 10; i++) {
  
}
little_prince.addBookToLibrary()
the_hobbit.addBookToLibrary()
console.log(myLibrary)

displayBooks()