let myLibrary = [];
let requestURL="";// = 'https://jgarne1.github.io/BookLibrary/data.json';
requestURL='https://json.extendsclass.com/bin/27ff3081cb53';
let request = new XMLHttpRequest();

//Book constructor
function Book(author, title, numberOfPages, readStatus) {
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus;
    this.url = "https://image.shutterstock.com/image-vector/mario-bros-symbol-on-red-600w-480377119.jpg";
};


function LoadJSON() {
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
}


request.onload = function() {
    let jsonBooks = request.response;
    for (key in jsonBooks){
        loadMyLibrary(jsonBooks[key]);
        console.log(jsonBooks[key]);
    }
}


function loadMyLibrary(jsonBook){
    let bookToLoad = new  Book();
    bookToLoad.author = jsonBook['author'];
    bookToLoad.title = jsonBook['title'];
    bookToLoad.numberOfPages = jsonBook['numberOfPages'];
    bookToLoad.readStatus = jsonBook['readStatus'];
    if(jsonBook['url']){
        bookToLoad.url = jsonBook['url'];
    }
    addBookToLibrary(bookToLoad);
}


function addBookToLibrary(bookToAdd) {
    myLibrary.push(bookToAdd);
    displayBooks();
};


function displayBooks() {
    //let text = "";
    let text="";
    let len = myLibrary.length;
    for (i = 0; i < len; i++) {
        text += CreateBookCard(myLibrary[i]);
    }
    text +="</div>";
    //document.getElementById("bookList").innerHTML = text;
    document.getElementById("bookCards").innerHTML = text;
};


function Submit() {
    let bookToAdd = new Book();
    bookToAdd.author = document.getElementById("author").value;
    bookToAdd.title = document.getElementById("title").value;
    bookToAdd.numberOfPages = document.getElementById("numberOfPages").value;
    bookToAdd.readStatus = document.getElementById("readStatus").checked;
    if(document.getElementById("url").value==""){
        bookToAdd.url = "https://image.shutterstock.com/image-vector/mario-bros-symbol-on-red-600w-480377119.jpg"
    }
    else{bookToAdd.url = document.getElementById("url").value;}
    addBookToLibrary(bookToAdd);
    document.getElementById("formAddBook").reset();
    console.log(myLibrary);
    UpdateJson();
    displayBooks();
};


function CreateBookCard(book){
    let checkStatus ="";
    if (book.readStatus){
        checkStatus="checked";
    }
    let text = 
    '<div class="bookCard">' + '<div class=bookBackground style="background-image:url(' + book.url + ');">' + '</div>'+ 
        '<div class = bookCardContent>' + 
            '<p>' +'Author:' + book.author +'<br> Title:' + book.title +'<br> Number of pages:' + book.numberOfPages  + '<br></p>' + 
        '</div><br>' + 
        '<div class = "readStatus">' + 'Book read: <br> <input type="checkbox" id = "readStatus" name="readStatus " '+ checkStatus + '>' + 
        '</div>' + 
    '</div>';
    return text;

}


function UpdateJson(){
    let myUpdate = JSON.stringify(myLibrary);
    let jsonURL=requestURL;
    let password ="";
    const request = new XMLHttpRequest();
    request.open("PUT", jsonURL, true);
    request.setRequestHeader("Security-key", password);
    request.onreadystatechange = () => {
    };
    request.send(myUpdate);
}

LoadJSON();
displayBooks();