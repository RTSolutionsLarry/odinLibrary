const addBookButton = document.getElementsByClassName('addBookButton')[0];
const bookName = document.getElementById('bookName');
const authorName = document.getElementById('authorName');
const numberOfPages = document.getElementById('numberOfPages');
const genreName = document.getElementById('genreName');
const cardsContainer = document.getElementsByClassName('cardsContainer')[0];
let library = [];

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

const cardButtonAction = (button,book,card) => {
    button.addEventListener('click', () => {
        let readBook = null;
        for (let i = 0; i < library.length; i++) {
            if (library[i].bookId === book.bookId) {
                readBook = library[i];
                if (readBook.hasBeenRead == false) {
                    readBook.hasBeenRead = true;
                    button.classList.add('isRead');
                    button.value = 'Read!';
                } else {
                    readBook.hasBeenRead = false;
                    button.classList.remove('isRead');
                    button.value = 'Finished Book';
                }
                break;
            }
        }
    })
}

const cardRemoval = (card) => {
    card.remove();
}

const arrayRemoval = (book) => {
    const index = library.findIndex(item => item.bookId === book.bookId);
    console.log(index);

    if (index !== -1) {
    library.splice(index, 1);
    }
    console.log(library);
    return library; 
    
}

const removeCardButton = (button,book,card) => {
    button.addEventListener('click', () => {
        console.log('Inside Remove button');
        cardRemoval(card);
        return arrayRemoval(book);
    })
}

const displayBook = (book) => {
    const card = document.createElement('div');
    card.setAttribute('class','card');
    card.classList.add(book.bookId);
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
    cardButton.setAttribute('class','readButton');
    //cardButton.classList.add(book.bookId);
    cardButton.addEventListener('click', cardButtonAction(cardButton,book));

    cardButtonContainer.appendChild(cardButton);

    const removeButton = document.createElement('input');
    removeButton.setAttribute('type','button');
    removeButton.setAttribute('value','Remove Book');
    removeButton.setAttribute('class','removeButton');
    removeButton.classList.add(book.bookId);
    removeButton.addEventListener('click', removeCardButton(removeButton,book,card));

    cardButtonContainer.appendChild(removeButton);

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

const addCard = (library) => {
    const newBook = library[library.length - 1];
    displayBook(newBook)    
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
//    displayBook(library);
    clearInputs();
    addCard(library);
})
