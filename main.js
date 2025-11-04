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

const cardButtonAction = (button,bookId) => {
    button.addEventListener('click', () => {
        let readBook = null;
        for (let i = 0; i < library.length; i++) {
            if (library[i].bookId === bookId) {
                readBook = library[i];
                break;
            }
        }
        if (readBook.hasBeenRead == false) {
            readBook.hasBeenRead = true;
            button.classList.add('isRead');
        } else {
            readBook.hasBeenRead = false;
            button.classList.remove('isRead');
        }
        console.log(bookId);
        
    })
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

        const bookTitle = document.createElement('h4');
        bookTitle.textContent = book.name;
        bookTitle.setAttribute('class','bookTitle');
        cardHeader.appendChild(bookTitle);

        const cardDetails = document.createElement('div');
        cardDetails.setAttribute('class','cardDescription');
        card.appendChild(cardDetails);

        const cardButtonContainer = document.createElement('div');
        cardButtonContainer.setAttribute('class','cardButtonContainer');
        card.appendChild(cardButtonContainer);

        const cardButton = document.createElement('input');
        cardButton.setAttribute('type','button');
        cardButton.setAttribute('value','Finished Book');
        cardButton.setAttribute('class','readButton')
        cardButtonContainer.appendChild(cardButton);
        cardButtonAction(cardButton,book.bookId);

        const author = document.createElement('p');
        const pages = document.createElement('p');
        const genre = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Number of pages: ${book.numberOfPages}`;
        genre.textContent = `Genre: ${book.genre}`
        cardDetails.appendChild(author);
        cardDetails.appendChild(genre);        
        cardDetails.appendChild(pages);
    }
}

const clearInputs = () => {
    const bookInputs = document.getElementsByClassName('inputs');
    for (input of bookInputs) {
        input.value = '';
    }
}

//Add Book button
addBookButton.addEventListener('click', ()=> {
    addBook(bookName.value,authorName.value,numberOfPages.value,genreName.value,false);
    displayBook(library);
    clearInputs();
})
