const addBookButton = document.getElementsByClassName('addBookButton')[0];
const bookName = document.getElementById('bookName');
const authorName = document.getElementById('authorName');
const numberOfPages = document.getElementById('numberOfPages');
const genreName = document.getElementById('genreName');
const cardsContainer = document.getElementsByClassName('cardsContainer')[0];
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

function addBook(name,author,numberOfPages,genre,hasBeenRead) {
    const newBook = new Book(name,author,numberOfPages,genre,hasBeenRead);
    newBook.bookIdGen();
    library.push(newBook);
}

addBook('Harry Potter');

const displayBook = (library) => {
    for (let book of library) {
        const card = document.createElement('div');
        card.setAttribute('class','card');
        cardsContainer.appendChild(card);      
    }
}

//Add Book button
addBookButton.addEventListener('click', ()=> {
    //test code to check inputs
    console.log('You clicked!');
    console.log(bookName.value);
    console.log(authorName.value);
    console.log(numberOfPages.value);
    console.log(genreName.value);

    addBook(bookName.value,authorName.value,numberOfPages.value,genreName.value,false);
    console.table(library);
    displayBook(library);
})

