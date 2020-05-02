import Book from "../js/book.js"
    //from "../js/book.js";
var buttonHistory= document.querySelector('.submit');
const containerHistory = document.querySelector('#div1');



var b1 = new Book();
document.addEventListener("DOMContentLoaded", function (qualifiedName, value){
    try{
        console.log("Hello World");
        var retrieveHistory = localStorage.getItem("historyBooks");
        var historyArr = JSON.parse(retrieveHistory);
        console.log(historyArr);
        for(var i = 0; i < historyArr.length; i++){
            var div1 = document.createElement("DIV");
            var divClass = document.createAttribute("class");
            divClass.value = "row mt-3 mb-3";
            div1.setAttributeNode(divClass);
            var div2 = document.createElement("DIV");
            var divClass2 = document.createAttribute("class");
            divClass2.value = "col-sm-12";
            div2.setAttributeNode(divClass2);
            var div3 = document.createElement("DIV");
            var divClass3 = document.createAttribute("class");
            divClass3.value = "card";
            div3.setAttributeNode(divClass3);

            var div4 = document.createElement("DIV");
            var divClass4 = document.createAttribute("class");
            divClass4.value = "card-body";
            div4.setAttributeNode(divClass4);


            var hTitle = document.createElement("P");
            var hAuthor = document.createElement("P");
            //var hdesc = document.createElement("P");
            var hPrice = document.createElement("P");

            var pImg = document.createElement("IMG");
            var imgSrc = document.createAttribute("src");
            imgSrc.value = historyArr[i]['image'];
            pImg.setAttributeNode(imgSrc);

            // Text for P tags
            var nodeTitle = document.createTextNode(historyArr[i].title);
            var nodeAuthor = document.createTextNode(historyArr[i].author);
            //var nodeDesc = document.createTextNode(historyArr[i].descript);
            var nodePrice = document.createTextNode(historyArr[i].price);
            hTitle.appendChild(nodeTitle);
            hAuthor.appendChild(nodeAuthor);
            //hdesc.appendChild(nodeDesc);
            hPrice.appendChild(nodePrice);

            div4.appendChild(pImg);
            div4.appendChild(hTitle);
            div4.appendChild(hAuthor);
            div4.appendChild(hPrice);
            //div4.appendChild(hdesc);

            div3.appendChild(div4);
            div2.appendChild(div3);
            div1.appendChild(div2);
            console.log(div1.innerHTML);
            containerHistory.appendChild(div1);
        }

    }
    catch(e) {
        console.log(e)
        console.log("Hiccup")

    }
});
