import B, {getTitle} from "../js/book.js";
var input = document.querySelector('.input_text');
var button= document.querySelector('.submit');
var bookArray = [];
var historyArray = [];
localStorage.setItem("historyBooks", JSON.stringify(historyArray))
function cleanSlate(i){
    try{
        var elementID = "result" + i.toString();
        const resultBook = document.getElementById(elementID);
        const removeParagraph = resultBook.getElementsByTagName("P");
        const removeImage = resultBook.getElementsByTagName("IMG");
        resultBook.removeChild(removeParagraph[0]);
        resultBook.removeChild(removeParagraph[1]);
        resultBook.removeChild(removeParagraph[0]);
        resultBook.removeChild(removeParagraph[0]);
        resultBook.removeChild(removeImage[0]);
        //removeImage.remove();

    }catch(e) {
        console.log('error', e)
    }

}
function createResults(bookElement, j){
    try{
        var pTitle = document.createElement("P");
        var pAuthor = document.createElement("P");
        var pdesc = document.createElement("P");
        var pPrice = document.createElement("P");

        var pImg = document.createElement("IMG");
        var imgSrc = document.createAttribute("src");
        imgSrc.value = bookElement['image'];
        pImg.setAttributeNode(imgSrc);

        // Text for P tags

        var nodeTitle = document.createTextNode(bookElement.title);
        var nodeAuthor = document.createTextNode(bookElement.author);
        var nodeDesc = document.createTextNode(bookElement.descript);
        var nodePrice = document.createTextNode(bookElement.price);
        pTitle.appendChild(nodeTitle);
        pAuthor.appendChild(nodeAuthor);
        pdesc.appendChild(nodeDesc);
        pPrice.appendChild(nodePrice);
        var elmntID = "result"+j.toString();
        var elmnt = document.getElementById(elmntID);
        elmnt.appendChild(pImg);
        elmnt.appendChild(pTitle);
        elmnt.appendChild(pAuthor);
        elmnt.appendChild(pPrice);
        elmnt.appendChild(pdesc);
    }
    catch(e) {
        console.log("Hiccup")

    }
}
button.addEventListener('click', function(){
    let testLocal = 'Hello World';
    localStorage.setItem("testLocal", "Hello World");
    cleanSlate();
    bookArray = [];
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("https://www.googleapis.com/books/v1/volumes?q="+input.value+"&key=AIzaSyC5Rv2prJ4aUf4EkIwj10RmKSVcX6uKaGI", requestOptions)
        .then(response => response.json())
        .then(result => {
            for (var i = 0, l = result['items'].length; i < l; i++){
                cleanSlate(i);
                var item = result['items'][i]['volumeInfo'];
                var idB = result['items'][i]['id'];
                var titleB = item['title'];
                var authorB = item['authors'][0];
                var descB = item['description'];
                var optionalValue = safetyNet(result['items'][i]);
                var priceB = optionalValue[0];
                var imgURL = optionalValue[1];
                var bookB = new B(titleB, authorB, idB, descB, priceB, imgURL);

                var retrieveData = localStorage.getItem("historyBooks");
                historyArray = JSON.parse(retrieveData);
                bookArray.push(bookB);
                historyArray.push(bookB);
                localStorage.setItem("historyBooks", JSON.stringify(historyArray));
                createResults(bookB, i);
            }
        })
        .catch(error => console.log('error', error))
});
function safetyNet(bookElement){
    try{
        var safteyPrice = bookElement['saleInfo']['listPrice']['amount'].toString()+" "+bookElement['saleInfo']['listPrice']['currencyCode'];
    }
    catch(err) {
        if (typeof safteyPrice == "undefined"){
            safteyPrice = "Price Unavailable";
        }
    }
    try{
        var safetyImg = bookElement['volumeInfo']['imageLinks']['smallThumbnail'];
    }catch(err) {
        if (typeof safetyImg == "undefined"){safetyImg = "Image unavailable"}
    }
    return [safteyPrice, safetyImg];
}
