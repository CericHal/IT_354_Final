export default class Book {
    constructor(title, author, id, descript, price, image) {
        this.title = title;
        this.author = author;
        this.id = id;
        this.descript = descript;
        this.price = price;
        this.image = image;
    }
}
export function getTitle(book) {
    return book.title
}

export function setPrice(book){
    this.price = book.price
}