const dialog = document.querySelector('dialog');
const addButton = document.querySelector('.add-book');
const submitBtn = document.querySelector('.submit');
const cancelBtn = document.querySelector('.cancel');
const output = document.querySelector('.output');
const form = document.querySelector('form');

const myLibrary = [];

function Book (name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
}

Book.prototype.getName = function () {
    return this.name;
}

Book.prototype.getAuthor = function () {
    return this.author;
}

Book.prototype.getPages = function () {
    return this.pages;
}

Book.prototype.getStatus = function () {
    return this.status;
}

Book.prototype.getID = function () {
    return this.id;
}   

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

function getBookFromForm () {
    const inputName = document.querySelector('#name').value;
    const inputAuthor = document.querySelector('#author').value;
    const inputPages = document.querySelector('#pages').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    
    return new Book(inputName, inputAuthor, inputPages, status);
}

function listenBookCardRemoval (bookBtn, id, card) {
    bookBtn.addEventListener('click', () => {
        myLibrary.forEach(b => {
            if (b.getID === id) {
                console.log(typeof card);
                console.log(card);
                card.remove();
            }
        });
    });
}

function createBookHTMLElement (Book) {
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const status = document.createElement('p');
    const buttons = document.createElement('div');
    const delBtn = document.createElement('button');
    const changeStat = document.createElement('button');

    title.textContent = Book.getName();
    author.textContent = Book.getAuthor();
    pages.textContent = Book.getPages();
    status.textContent = Book.getStatus();
    card.className = 'card';
    buttons.className = 'buttons';
    delBtn.className = 'del-book';
    delBtn.textContent = 'Delete';
    changeStat.className = 'change-status-book';
    changeStat.textContent = 'Change Status';

    buttons.appendChild(changeStat);
    buttons.appendChild(delBtn);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    card.appendChild(buttons);

    output.appendChild(card);
    console.log(typeof card);
    console.log(card);

    changeStatusReading(changeStat, status);
    listenBookCardRemoval(delBtn, Book.getID, card);
}

function changeStatusReading (changeStat, status) {
    changeStat.addEventListener ('click', () => {        
        if (status.textContent === 'Reading...') {
            status.textContent = 'Finished';
        } else {
            status.textContent = 'Reading...'
        }
    });
}

addButton.addEventListener('click', () => {
    form.reset();
    dialog.showModal();
});

submitBtn.addEventListener('click', (event) => {
    let book = getBookFromForm();
    console.log(book);
    addBookToLibrary(book);
    createBookHTMLElement(book);
    dialog.close();
});


cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
});


//             <div class="card">
//     <div class="header">
//         <h3>Title</h3>
//     </div>

//     <p class="book-name">Name</p>
//     <p class="book-author">Author</p>
//     <p class="book-pages">Pages</p>
//     <p class="book-status">Status</p>

//     <div class="buttons">
//         <button class="change-status book">Change status</button>
//         <button class="del book">Delete</button>
//     </div>
// </div>
