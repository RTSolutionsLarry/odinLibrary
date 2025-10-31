const addBookButton = document.getElementsByClassName('addBookButton')[0];
console.log(addBookButton);

const library = [];

//this is the book constructor
function Book(name,author,numberOfPages,genre,hasBeenRead) {
    this.name = name;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.genre = genre;
    this.hasBeenRead = hasBeenRead;
}

//this function generates a unique id
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

//Add Book button
addBookButton.addEventListener('click', ()=> {
    console.log('You clicked!');
    
})