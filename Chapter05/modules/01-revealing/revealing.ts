var myBooks = (function() {
    var collection = [
        {
            name: "Lord of the rings",
            author: "JRR Tolkien",
            rating: 10
        },
        {
            name: "1984",
            author: "George Orwell",
            rating: 9
        }
    ];

    function getCollection() {
        return collection;
    }

    function favoriteBook() {
        return collection[0];
    }

    function sortBooks() {
        // no-op
    }

    function addBook(book) {
        collection.push(book);
        sortBooks();
    }

    return {
        books: getCollection(),
        addBook: addBook,
        favoriteBook: favoriteBook()
}

})(); // immediately invoked

myBooks.addBook({name: "foo", author: "bar"});

console.log(myBooks.books);

console.log("Favorite: ", myBooks.favoriteBook);

