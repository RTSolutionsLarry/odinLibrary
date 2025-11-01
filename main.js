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

const clearGrid = () => {
    const gridItems = document.getElementsByClassName('card');
    while (gridItems.length > 0) {
        gridItems[0].parentNode.removeChild(gridItems[0]);
    }
}

const displayBook = (library) => {
    clearGrid();
    for (let book of library) {
        const card = document.createElement('div');
        card.setAttribute('class','card');
        cardsContainer.appendChild(card);
        
        const cardHeader = document.createElement('div');
        cardHeader.setAttribute('class','cardHeader');
        card.appendChild(cardHeader);

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.name;
        bookTitle.setAttribute('class','bookTitle');
        cardHeader.appendChild(bookTitle);

        const cardDetails = document.createElement('div');
        cardDetails.setAttribute('class','cardDescription');
        card.appendChild(cardDetails);

        const author = document.createElement('p');
        const pages = document.createElement('p');
        const genre = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `${book.numberOfPages} pages`;
        genre.textContent = `Genre: ${book.genre}`
        cardDetails.appendChild(author);
        cardDetails.appendChild(genre);        
        cardDetails.appendChild(pages);

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
