let myLibrary = [];

//Creating a Book-object Constructor
function Book(name,author,pages,isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = `by ${this.author} and is ${this.pages} pages long`;
}

//Function that adds the book-object to the myLibrary array and returns the index number;
function addBookToLibrary(book) {
    let i = myLibrary.length;
    myLibrary.push(book);
    return i;
}

function numberToLetters(num) {
    let letters = ''
    while (num >= 0) {
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters
        num = Math.floor(num / 26) - 1
    }
    return letters
}

//a container that will house all the book cards
const bookCards = document.querySelector('.book-cards');

//delete Books
function deleteBook (indexID = dataIndex) {
    const element = document.querySelector('[data-index =' + indexID + ']');
    element.remove();
}

function toggleRead (indexID = dataIndex) {
    const element = document.querySelector('[data-index =' + indexID + ']');
    element.classList.toggle('read');
}

//add Book Card to the card container
function addBookCard () {
    const bookName = document.getElementById("name").value;
    const bookAuthor = document.getElementById("author").value;
    const bookPages = document.getElementById("pages").value;
    const bookReadStatus = document.querySelector('input[name="isRead"]:checked').value;

    const bookObject = new Book(bookName,bookAuthor,bookPages,bookReadStatus);
    
    let arrayIndex = addBookToLibrary(bookObject);
    let dataIndex = numberToLetters(arrayIndex);

    const bookContainer = document.createElement('div');

    console.log(bookReadStatus);

    if (bookReadStatus === "true") {
        bookContainer.classList.add('read');
    } else {bookContainer.classList.add('unread');}

    bookContainer.dataset.index = dataIndex;
    
    const bookHeader = document.createElement('h3');
    const bookText = document.createElement('p');
    bookHeader.textContent = bookObject.name;
    bookText.textContent = bookObject.info;

    const readButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    readButton.textContent = "Have you read it?";
    deleteButton.textContent = "Delete";

    readButton.dataset.index = dataIndex;
    deleteButton.dataset.index = dataIndex;

    bookCards.appendChild(bookContainer);
    bookContainer.appendChild(bookHeader);
    bookContainer.appendChild(bookText);
    bookContainer.appendChild(readButton);
    bookContainer.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        deleteBook(dataIndex);
    });

    readButton.addEventListener('click', () => {
        toggleRead(dataIndex);
    });
}

/// form-submit button
const btn = document.querySelector("button");
btn.addEventListener("click", () => {
    addBookCard();
})
