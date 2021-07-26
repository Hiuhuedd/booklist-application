//BOOK REPRESENTATIO
class Copy {
    constructor(title, author, publisher, isbn) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.isbn = isbn;
    }
}
//USER INTERFACE
class UI {
    static displayBooks() {
        const books = lS.addToUI();
        console.log(books);
        books.forEach((copy) => UI.addBooksToList(copy));
    }
    static addBooksToList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");
        row.innerHTML =
            `<td class="text-danger">${book.title}</td> 
             <td>${book.author}</td>
             <td>${book.publisher}</td>
             <td>${book.isbn}</td>
             <td><a class="btn btn-secondary btn-sm remove" href="#">X</a></td>
             `;
        list.appendChild(row);
    }
    static deleteBooks(element) {
        if (element.classList.contains('remove')) {
            element.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, stylingclass) {
        const container = document.querySelector('.input');
        const form = document.querySelector('#book-form');
        const div = document.createElement('div');
        div.className = `alert alert-${stylingclass}`
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, form)
        setTimeout(() => document.querySelector('.alert').remove(), 2000);

    }
    static clearfields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#publisher').value = '';
        document.querySelector('#isbn').value = '';

    }
}
//LOCAL STORAGE
class lS {
    static addToUI() {
        let books;
        if (localStorage.getItem('books') == null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }
    static addToLocalStorage(copy) {
        const books = lS.addToUI()
        books.push(copy)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static deleteFromLocalStorage(isbn) {
        const books = lS.addToUI()
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books))
    }
}
///////////////////////////////////events///////////////////////////////
//OUTPUT EVENT
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// INPUT SUBMISSION EVENT
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const publisher = document.querySelector('#publisher').value;
    const isbn = document.querySelector('#isbn').value;


    //validation OF INPUT
    if (title === '' || author === '' || publisher === '' || isbn === '') {
        UI.showAlert('Please fill all fields', 'danger')
    } else {

        //input instantiation

        const book = new Copy(title, author, publisher, isbn)



        UI.addBooksToList(book)
        UI.showAlert('Book added successfully', 'success')
        UI.clearfields()
        lS.addToLocalStorage(book)
    }

});
//DELETE EVENT
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBooks(e.target);
    UI.showAlert('Title Deleted', 'secondary')
    console.log(e.target.parentElement.previousElementSibling.textContent)
    lS.deleteFromLocalStorage(e.target.parentElement.previousElementSibling.textContent)
})