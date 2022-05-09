let myLibrary = []


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

function displayBooks() {
  // Displays every book in the library one by one

  // Display the books in a table where every book has its own row

  // Add a button to every book so you can remove them from the library  One easy solution is giving them a data-attribute that corresponds to the index of the library array.

  // Add a button to each book to change its read status. The read status should be stored in the Book contructor
}

little_prince = new Book("The Little Prince", "Antoine de Saint-Exupéry", 1943)

console.log(little_prince)
little_prince.addBookToLibrary()
console.log(myLibrary)