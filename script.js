class Book {
    #name;
    #author;
    #pages;
    #status;
    #id;
        
    constructor (name, author, pages, status) {
        this.#name = name;
        this.#author = author;
        this.#pages = pages;
        this.#status = status;
        this.#id = crypto.randomUUID();
    }

    getName () {
        return this.#name;
    }

    getAuthor () {
        return this.#author;
    }

    getPages () {
        return this.#pages;
    }

    getStatus () {
        return this.#status;
    }

    setStatus(status) {
        this.#status = status;
    }

    getId() {
        return this.#id;
    }
}

class Library {
    #myLibrary
    #parser

    constructor () {
        this.#myLibrary = new Array();
        this.#parser = new domParser(this);
    }

    getLibrary () {
        return this.#myLibrary;
    }

    addBook(Book) {
        this.#myLibrary.push(Book);
    }

    removeBook(Book) {
        this.#myLibrary = this.#myLibrary.filter(b => b.getId() !== Book.getId());
    }
}

class domParser {
    #dialog;
    #addButton;
    #submitBtn;
    #cancelBtn;
    #output;
    #form;
    #inputName;
    #inputAuthor;
    #inputPages;
    #status;
    #LibraryRef;

    constructor (LibraryRef) {
        this.#dialog = document.querySelector('dialog');
        this.#addButton = document.querySelector('.add-book');
        this.#submitBtn = document.querySelector('.submit');
        this.#cancelBtn = document.querySelector('.cancel');
        this.#output = document.querySelector('.output');
        this.#form = document.querySelector('form');
        this.#LibraryRef = LibraryRef;

        this.#addListenersButtons();
    }

    #getBookFromForm () {
        this.#inputName = document.querySelector('#name').value;
        this.#inputAuthor = document.querySelector('#author').value;
        this.#inputPages = document.querySelector('#pages').value;
        this.#status = document.querySelector('input[name="status"]:checked').value;

        if (this.#inputName !== '' && this.#inputAuthor !== '' && this.#inputPages !== '') {
            return new Book(this.#inputName, this.#inputAuthor, this.#inputPages, this.#status);
        }
    }

    #listenForm() {
        this.#form.addEventListener('submit', (event) => {
            let book = this.#getBookFromForm();

            if (book !== undefined) {
                event.preventDefault();
                this.#LibraryRef.addBook(book);
                this.#createBookHTMLElement(book);
            }

            this.#dialog.close();
        });
    }

    #addListenersButtons () {
        this.#listenAddBtn();
        this.#listenForm();
        this.#listenCancelBtn();
    }

    #listenAddBtn () {
        this.#addButton.addEventListener('click', () => {
            this.#form.reset();
            this.#dialog.showModal();
        });
    }

    #listenCancelBtn () {
        this.#cancelBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.#dialog.close();
        });
    }

    #listenChangeStatusBtn(changeStat, status, Book) {
        changeStat.addEventListener('click', () => {
            if (status.textContent === 'Reading...') {
                status.textContent = 'Finished';
                Book.setStatus('Finished');
            } else {
                status.textContent = 'Reading...';
                Book.setStatus('Reading...');
            }
        });
    }

    #listenBookCardRemovalBtn(delBtn, card, Book) {
        delBtn.addEventListener('click', () => {
            this.#output.removeChild(card);
            this.#LibraryRef.removeBook(Book);
        });
    }

    #createBookHTMLElement (Book) {
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

        this.#output.appendChild(card);

        this.#listenChangeStatusBtn(changeStat, status, Book);
        this.#listenBookCardRemovalBtn(delBtn, card, Book);
    }
}

const library = new Library();