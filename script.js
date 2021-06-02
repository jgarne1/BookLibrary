let myLibrary = [];
let requestURL="";// = 'https://jgarne1.github.io/BookLibrary/data.json';
requestURL='https://json.extendsclass.com/bin/27ff3081cb53';
let request = new XMLHttpRequest();
let  tempBookID = null;
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
        text += CreateBookCard(myLibrary[i],i);
    }
    text +="</div>";
    //document.getElementById("bookList").innerHTML = text;
    document.getElementById("bookCards").innerHTML = text;
    //hide popup


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


function CreateBookCard(book,bookID){
    tempBookID =bookID;
    let checkStatus ="";
    if (book.readStatus){
        checkStatus="checked";
    }
    let  cardBackground = '<div class=bookBackground style="background-image:url(' + book.url + ');">' + '</div>';
    let cardAuthor = 'Author:' + book.author;
    let cardTitle = 'Title:' + book.title;
    let cardPages = 'Number of pages:' + book.numberOfPages;
    let cardReadStatus = '<div class = "readStatus">' + 'Book read: <br> <input type="checkbox" id = "book' +bookID + '" onclick="EditReadStatus('+ bookID +')" name="readStatus " '+ checkStatus + '>';
    let cardDeleteBTN = '<input type="button" id = "book' +bookID +'" class="DeleteButton" onclick="DeleteBook('+ bookID +')" value="X">';
    let cardEditBTN = '<input type="button" id = "book' +bookID +'" class="EditButton" onclick="editShowForm('+ bookID +')" value="Edit">' + '</div>';
    let builtCard = 
    '<div class="bookCard">' + cardBackground + 
        '<div class = bookCardContent>' + 
            '<p>' + cardAuthor+  '<br>' + cardTitle +'<br>' + cardPages + '<br></p>' + 
        '</div><br>' + 
        cardReadStatus + cardEditBTN + cardDeleteBTN
    +'</div>';
    return builtCard;

}

function editShowForm(bookID){  
    let text ='<div id ="EditForm">' +
        '<form class="EditForm">' +
            '<h5>Edit book</h5>' +
            '<label for ="editTitle">Title</label>' +
            '<input type="text" id="editTitle" class ="EditbookFields" name="title" required value="' + myLibrary[bookID].title + '"><br>' +
            '<label for ="editAuthor">Author</label>' +
            '<input type="text" id="editAuthor" class ="EditbookFields" name="author" required value="' + myLibrary[bookID].author + '"><br>' +
            '<label for ="editNumberOfPages">Number of pages</label>' +
            '<input type="number" id ="editNumberOfPages" class ="EditbookFields" name="numberOfPages" value="' + myLibrary[bookID].numberOfPages + '"><br>' +
            '<label for ="editUrl">Image URL</label>' +
            '<input type="text" id ="editUrl" class ="EditbookFields" name="URL" value="' + myLibrary[bookID].url + '" required><br>' +
            '<br><br>' +
            '<input type="button" class="EditButtons" onclick="EditBook(' + bookID +')" value="Save">' + 
            '<input type="button" class="EditButtons" onclick="closeEditBook()" value="Cancel">' +
        '</form>' +
   '</div> ' ;
document.getElementById('editPopUp').innerHTML = text;
document.getElementById('editPopUp').style.display = "block";
}

function EditReadStatus(bookID){
    myLibrary[bookID].readStatus = document.getElementById('book' + bookID).checked;
    console.log(myLibrary[bookID].readStatus);
    UpdateJson();
    displayBooks();
}


function DeleteBook(bookID){
    if (confirm("Delete " + myLibrary[bookID].title + "?"))
    {
        myLibrary.splice(bookID,1)
    }
    UpdateJson();
    displayBooks();
}

function EditBook(bookID){
   myLibrary[bookID].title = document.getElementById("editTitle").value;
   myLibrary[bookID].author = document.getElementById("editAuthor").value;
   myLibrary[bookID].numberOfPages = document.getElementById("editNumberOfPages").value;
   myLibrary[bookID].url = document.getElementById("editUrl").value;
   UpdateJson();
   closeEditBook();
   displayBooks();

}

function closeEditBook(){
    document.getElementById('editPopUp').style.display = "none";
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