//book class which represent a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI class for UI task
class UI {
    static displayBooks() {

        const books = Store.getBooks();
        books.forEach((book) => UI.addBookTolist(book));
    }
    static addBookTolist(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href"#" class="btn btn-danger btn-sm delete">x</a></td>
        `;

        list.appendChild(row);
    }
    static deleteBook(el) {
            if (el.classList.contains('delete')) {
                el.parentElement.parentElement.remove();
            }
        }
        //showalert
    static showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form);

        //vanish in 3 sec
        setTimeout(() => document.querySelector('.alert').remove(), 3000);

    }


    static clearFields() {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }
}
//store class to store a book
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books

    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));


    }
}
















//event display book

document.addEventListener('DOMContentLoaded', UI.displayBooks);




// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    //validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('please fill all the fields', 'danger')
    } else {

        //instantiate book 
        const book = new Book(title, author, isbn);
        //show success msg
        UI.showAlert('Book added', 'success')
            //add a book to UI
        UI.addBookTolist(book);
        //add a book to storage
        Store.addBook(book);
        //clear field
        UI.clearFields();
    }
});

//event remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)


    //remove book from storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show remove msg
    UI.showAlert('Book removed', 'info')
})


/*class Mobile {
    constructor(model, ram, processor, camera) {
        this.model = model;
        this.ram = ram;
        this.processor = processor;
        this.camera = camera;
    }

    makeCall() {

    }

    sendText() {

    }

    showPhoneInfo() {
        return `This phone is ${this.model} has ram of ${this.ram} and processor of ${this.processor} and the camera is ${this.camera}`
    }
}





const samsungNewMobile = new Mobile('Samsung', '2gb', 'SnapDragon 730g', '64MP');

const phoneInfo = samsungNewMobile.showPhoneInfo();

console.log(phoneInfo);*/