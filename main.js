const library = [];

function Book(name) {
    this.name = name;
}

Book.prototype.bookIdGen = function() {
    const idGen = crypto.randomUUID();
    this.bookId = idGen;
}

function addBook(name) {
    const newBook = new Book(name);
    newBook.bookIdGen();
    library.push(newBook);
}

addBook('Harry Potter');

console.log(library);
console.log(library[0]);
console.log(library[0].bookId);

