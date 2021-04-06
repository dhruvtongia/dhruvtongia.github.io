
// Book class 
class Book
{
    constructor(name , author, id)
    {
        this.name=name;
        this.author=author;
        this.id=id;
    }
}

// Display class 
class display
{
    // no constructor
    
    static display_book()
    {
        
        const books= Store.getBooks();

        books.forEach((book)=> display.add_books(book));


    }

    static add_books(bookk)
    {
        const row=document.createElement('tr');
        row.innerHTML=
        `<td>${bookk.name}</td>
        <td>${bookk.author}</td>
        <td>${bookk.id}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        const list=document.getElementById("table-list");

        list.appendChild(row);
    }

    static show_alert(message,classname)
    {
        const div=document.createElement("div");
        div.className=`alert alert-${classname}`;

        div.appendChild(document.createTextNode(message));
        
        const cointainer=document.querySelector(".container");
        const par=document.querySelector("#submitted");

        cointainer.insertBefore(div,par);

        // removing it after 2 sec

        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 2000);
    }

    static clear_all()  
    {
        document.querySelector("#booname").value='';
        document.querySelector("#booau").value='';
        document.querySelector("#booid").value='';
    }

    static delete_book(el)
    {
        el.parentElement.parentElement.remove();  // first parent will be td and its parent will be tr ie row
    }
}

// Store  class for local storage
class Store
{
    static getBooks()
    {
        let books;
        if(localStorage.getItem("books")===null)
        {
            books=[];
        }
        else
        {
            books=JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBooks(book1)
    {
        const books=Store.getBooks();
        books.push(book1);
        localStorage.setItem("books",JSON.stringify(books));
    }

    static removeBooks(id)
    {
        const books=Store.getBooks();

        books.forEach((book,index) => {

            if(book.id===id)
            {
                books.splice(index,1);
                localStorage.removeItem(book);
                
            }
        });
        localStorage.setItem("books",JSON.stringify(books));
    }
}

let pressedd=document.getElementById("submitted");

// to display the already stored books

document.addEventListener('DOMContentLoaded',display.display_book());



// adding books to the list
pressedd.addEventListener("submit",showww);

function showww(e)
{
    e.preventDefault();

    console.log("hello");
    let title=document.getElementById("booname").value;
    let aut= document.getElementById('booau').value;
    let idd=document.getElementById('booid').value;

    if(title===''||aut===''||idd==='')
    {
        display.show_alert("fields missing","danger");

    }
    else
    {
            let book1= new Book(title,aut,idd);

            //console.log(book1);

            // adding books to the list
            display.add_books(book1);

            // adding books to the local storage
            Store.addBooks(book1);

            // showing the alert message
            display.show_alert("book added successfully" , "success");

            // after submitting the values are still there in form , so to remove them
            display.clear_all(); 
    }

    
}

// removing books from the list

document.querySelector("#table-list").addEventListener("click",(e)=> {

    if(e.target.classList.contains('delete'))
        {
            //console.log(e.target);

            // removing books from list (i.e. display)
            display.delete_book(e.target);

            // removing book from the local storage by its unique id
            Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

            // showing the alert message
            display.show_alert("book deleted successfully", "success");

            

        }

});

