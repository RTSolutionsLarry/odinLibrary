const library = [];

function Book(name,author,numberOfPages,genre,hasBeenRead) {
    this.name = name;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.genre = genre;
    this.hasBeenRead = hasBeenRead;
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

const displayBook = (library) => {
    for (let book of library) {
        console.log(book);
    }
}

displayBook(library);