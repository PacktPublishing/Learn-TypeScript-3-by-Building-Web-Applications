"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var localforage_1 = __importDefault(require("localforage"));
var class_transformer_1 = require("class-transformer");
console.log("MediaMan - Loading...");
var Genre;
(function (Genre) {
    Genre["Horror"] = "Horror";
    Genre["Fantastic"] = "Fantastic";
    Genre["Thriller"] = "Thriller";
    Genre["Romance"] = "Romance";
    Genre["Fiction"] = "Fiction";
    Genre["ScienceFiction"] = "Science Fiction";
})(Genre || (Genre = {}));
var Media = /** @class */ (function () {
    function Media(_name, _description, _pictureLocation, _genre, identifier) {
        this._name = _name;
        this._description = _description;
        this._pictureLocation = _pictureLocation;
        this._genre = _genre;
        if (identifier) {
            this._identifier = identifier;
        }
        else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }
    Object.defineProperty(Media.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        set: function (identifier) {
            this._identifier = identifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (description) {
            this._description = description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "pictureLocation", {
        get: function () {
            return this._pictureLocation;
        },
        set: function (pictureLocation) {
            this._pictureLocation = pictureLocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "genre", {
        get: function () {
            return this._genre;
        },
        set: function (genre) {
            this._genre = genre;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "identifier", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "name", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "description", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "pictureLocation", null);
    __decorate([
        class_transformer_1.Expose()
    ], Media.prototype, "genre", null);
    return Media;
}());
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(name, description, pictureLocation, genre, author, numberOfPages, identifier) {
        var _this = _super.call(this, name, description, pictureLocation, genre, identifier) || this;
        _this._numberOfPages = numberOfPages;
        _this._author = author;
        return _this;
    }
    Object.defineProperty(Book.prototype, "author", {
        get: function () {
            return this._author;
        },
        set: function (author) {
            this._author = author;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Book.prototype, "numberOfPages", {
        get: function () {
            return this._numberOfPages;
        },
        set: function (numberOfPages) {
            this._numberOfPages = numberOfPages;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        class_transformer_1.Expose()
    ], Book.prototype, "author", null);
    __decorate([
        class_transformer_1.Expose(),
        class_transformer_1.Type(function () { return Number; })
    ], Book.prototype, "numberOfPages", null);
    return Book;
}(Media));
var Movie = /** @class */ (function (_super) {
    __extends(Movie, _super);
    function Movie(name, description, pictureLocation, genre, duration, director, identifier) {
        var _this = _super.call(this, name, description, pictureLocation, genre, identifier) || this;
        _this._duration = duration;
        _this._director = director;
        return _this;
    }
    Object.defineProperty(Movie.prototype, "director", {
        get: function () {
            return this._director;
        },
        set: function (director) {
            this._director = director;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Movie.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (duration) {
            this._duration = duration;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        class_transformer_1.Expose()
    ], Movie.prototype, "director", null);
    __decorate([
        class_transformer_1.Expose()
    ], Movie.prototype, "duration", null);
    return Movie;
}(Media));
var MediaCollection = /** @class */ (function () {
    function MediaCollection(type, name, identifier) {
        this._name = "";
        this._collection = [];
        this._type = type;
        if (name) {
            this._name = name;
        }
        if (identifier) {
            this._identifier = identifier;
        }
        else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }
    Object.defineProperty(MediaCollection.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        set: function (identifier) {
            this._identifier = identifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaCollection.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaCollection.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (collection) {
            this._collection = collection;
        },
        enumerable: true,
        configurable: true
    });
    MediaCollection.prototype.addMedia = function (media) {
        if (media) {
            this._collection = this._collection.concat(media);
        }
    };
    MediaCollection.prototype.removeMedia = function (itemId) {
        if (itemId) {
            this._collection = this._collection.filter(function (item) {
                return item.identifier !== itemId;
            });
        }
    };
    __decorate([
        class_transformer_1.Expose()
    ], MediaCollection.prototype, "identifier", null);
    __decorate([
        class_transformer_1.Expose()
    ], MediaCollection.prototype, "name", null);
    __decorate([
        class_transformer_1.Expose(),
        class_transformer_1.Type(function (options) {
            if (options) {
                return options.newObject._type;
            }
            else {
                throw new Error("Cannot not determine the type because the options object is null or undefined");
            }
        })
    ], MediaCollection.prototype, "collection", null);
    return MediaCollection;
}());
var MediaServiceImpl = /** @class */ (function () {
    function MediaServiceImpl(_type) {
        this._type = _type;
        console.log("Initializing media service for " + _type.name);
        // each instance of the media service has its own data store: https://github.com/localForage/localForage
        // the initialization options are described here: https://localforage.github.io/localForage/#settings-api-config
        this._store = localforage_1.default.createInstance({
            name: 'mediaMan',
            version: 1.0,
            storeName: "media-man-" + _type.name,
            description: 'MediaMan data store'
        });
    }
    MediaServiceImpl.prototype.loadMediaCollection = function (identifier) {
        var _this = this;
        console.log("Trying to load media collection with the following identifier: " + identifier);
        return new Promise(function (resolve, reject) {
            _this._store.getItem(identifier)
                .then(function (value) {
                console.log("Found the collection: ", value);
                var retrievedCollection = class_transformer_1.plainToClassFromExist(new MediaCollection(_this._type), value);
                console.log("Retrieved collection: ", retrievedCollection);
                resolve(retrievedCollection);
            })
                .catch(function (err) {
                reject(err); // let the error through
            });
        });
    };
    MediaServiceImpl.prototype.saveMediaCollection = function (collection) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!collection) {
                reject(new Error("The list cannot be null or undefined!"));
            }
            console.log("Saving media collection with the following name " + collection.name);
            var serializedVersion = class_transformer_1.classToPlain(collection, { excludePrefixes: ["_"] });
            console.log("Serialized version: ", serializedVersion);
            _this._store.setItem(collection.identifier, serializedVersion)
                .then(function (value) {
                console.log("Saved the " + collection.name + " collection successfully! Saved value: ", value);
                resolve();
            })
                .catch(function (err) {
                console.error("Failed to save the " + collection.name + " collection with identifier " + collection.identifier + ". Error: " + err);
                reject(err);
            });
        });
    };
    MediaServiceImpl.prototype.getMediaCollectionIdentifiersList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("Retrieving the list of media collection identifiers");
            _this._store.keys().then(function (keys) {
                console.log("Retrieved the of media collection identifiers: ", keys);
                resolve(keys);
            })
                .catch(function (err) {
                console.error("Failed to retrieve the list of media collection identifiers. Error: ", err);
                reject(err);
            });
        });
    };
    MediaServiceImpl.prototype.removeMediaCollection = function (identifier) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!identifier || '' === identifier.trim()) {
                reject(new Error("The identifier must be provided!"));
            }
            console.log("Removing media collection with the following identifier " + identifier);
            _this._store.removeItem(identifier)
                .then(function () {
                console.log("Removed the " + identifier + " collection successfully!");
                resolve();
            })
                .catch(function (err) {
                console.error("Failed to removed the " + identifier + " collection");
                reject(err);
            });
        });
    };
    return MediaServiceImpl;
}());
var HTMLMediaManView = /** @class */ (function () {
    function HTMLMediaManView() {
        this._genreOptions = "";
        this._newBookCollectionForm = document.getElementById('newBookCollection');
        this._newBookCollectionName = document.getElementById('newBookCollectionName');
        this._bookCollectionsContainer = document.getElementById("bookCollections");
        if (!this._newBookCollectionForm) {
            throw new Error("Could not initialize the view. The 'newBookCollection' element id was not found. Was the template changed?");
        }
        if (!this._newBookCollectionName) {
            throw new Error("Could not initialize the view. The 'newBookCollectionName' element id was not found. Was the template changed?");
        }
        if (!this._bookCollectionsContainer) {
            throw new Error("Could not initialize the view. The 'bookCollections' element id was not found. Was the template changed?");
        }
        for (var genreKey in Genre) {
            this._genreOptions += "<option value=\"" + genreKey + "\">" + Genre[genreKey] + "</option>\">";
        }
    }
    HTMLMediaManView.prototype.getNewBookCollectionName = function () {
        // build upon standard HTML DOM validation
        if (this._newBookCollectionName.checkValidity() === false) {
            this._newBookCollectionName.reportValidity();
            throw new Error("Invalid collection name!");
        }
        return this._newBookCollectionName.value;
    };
    HTMLMediaManView.prototype.renderBook = function (collectionIdentifier, book) {
        if (!book) {
            throw new Error("The book to render must be provided!");
        }
        var collectionTableBody = document.getElementById("collectionTableBody-" + collectionIdentifier);
        if (!collectionTableBody) {
            throw new Error("The table body for collection " + collectionIdentifier + " could not be found! Was the template changed?");
        }
        var tableRow = collectionTableBody.insertRow();
        tableRow.id = "book-" + collectionIdentifier + "-" + book.identifier;
        tableRow.innerHTML = "\n                <td>\n                    <img class=\"mediaImage\" src=\"" + book.pictureLocation + "\">\n                </td>\n                <td>" + book.name + "</td>\n                <td>" + book.genre + "</td>\n                <td>" + book.description + "</td>\n                <td>" + book.author + "</td>\n                <td>" + book.numberOfPages + "</td>\n                <td>\n                    <a href=\"#\" onclick=\"mediaManController.removeBook('" + collectionIdentifier + "','" + book.identifier + "');\">X</a>\n                </td>\n        ";
        collectionTableBody.appendChild(tableRow);
    };
    HTMLMediaManView.prototype.renderBookCollection = function (bookCollection) {
        var _this = this;
        this._bookCollectionsContainer.innerHTML += "\n        <div id=\"bookCollection-" + bookCollection.identifier + "\" class=\"collection\">\n            <h3 class=\"collectionName\">" + bookCollection.name + "</h3>\n\n            <div class=\"containerGroup\">\n                <div class=\"container\">\n                    <h3>New book</h3>\n\n                    <form id=\"newBook-" + bookCollection.identifier + "\" action=\"#\">\n                        <ul>\n                            <li>\n                                <input id=\"newBookName-" + bookCollection.identifier + "\" type=\"text\" title=\"Name\" placeholder=\"Name\" required>\n                                <input id=\"newBookAuthor-" + bookCollection.identifier + "\" type=\"text\" placeholder=\"Author\" required>\n                            </li>\n                            <li>\n                                <select id=\"newBookGenre-" + bookCollection.identifier + "\" required>\n                                    " + this._genreOptions + "\n                                </select>\n                                <input id=\"newBookPages-" + bookCollection.identifier + "\" type=\"number\" placeholder=\"Pages\" required>\n                            </li>\n                            <li>\n                                <input id=\"newBookPicture-" + bookCollection.identifier + "\" type=\"url\" title=\"Picture\" placeholder=\"Picture URL\">\n                            </li>\n                            <li>\n                                <textarea id=\"newBookDescription-" + bookCollection.identifier + "\" placeholder=\"Description\"></textarea>\n                            </li>\n                        </ul>\n                        <input type=\"button\" value=\"Create\" onclick=\"mediaManController.createBook('" + bookCollection.identifier + "');\" />\n                    </form>\n                </div>\n                <div class=\"collectionToolsContainer\">\n                    <h3>Tools</h3>\n                    <form action=\"#\">\n                        <input type=\"button\" value=\"Remove collection\" onclick=\"mediaManController.removeBookCollection('" + bookCollection.identifier + "');\" />\n                    </form>\n                </div>\n            </div>\n\n            <div class=\"containerGroup\">\n                <div class=\"container\">\n                    <table class=\"collectionTable\">\n                        <thead>\n                        <tr>\n                            <td>Picture</td>\n                            <td>Name</td>\n                            <td>Genre</td>\n                            <td>Description</td>\n                            <td>Author</td>\n                            <td>Pages</td>\n                            <td>Remove</td>\n                        </tr>\n                        </thead>\n                        <tbody id=\"collectionTableBody-" + bookCollection.identifier + "\"></tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n        ";
        bookCollection.collection.forEach(function (book) {
            _this.renderBook(bookCollection.identifier, book);
        });
    };
    HTMLMediaManView.prototype.clearBookCollections = function () {
        this._bookCollectionsContainer.innerHTML = "";
    };
    HTMLMediaManView.prototype.removeBookCollection = function (identifier) {
        var bookCollectionDOMNode = document.getElementById("bookCollection-" + identifier);
        if (!bookCollectionDOMNode) {
            throw new Error("Could not remove the book collection from the DOM. Couldn't find the DOM node");
        }
        else {
            bookCollectionDOMNode.remove();
        }
    };
    HTMLMediaManView.prototype.displayErrorMessage = function (errorMessage) {
        if (!errorMessage) {
            throw new Error("An error message must be provided!");
        }
        alert(errorMessage); // bad user experience but ignore this for now
    };
    HTMLMediaManView.prototype.getNewBookDetails = function (collectionIdentifier) {
        if (!collectionIdentifier) {
            // we throw this one because it means that there is a bug!
            throw new Error("The collection identifier must be provided!");
        }
        // required
        var newBookForm = document.getElementById("newBook-" + collectionIdentifier);
        if (!newBookForm) {
            throw new Error("Could not find the new book form for collection " + collectionIdentifier);
        }
        // build upon standard HTML DOM validation
        if (newBookForm.checkValidity() === false) {
            newBookForm.reportValidity();
            return {
                error: "The new book form is invalid!"
            };
        }
        // from here on out, no need to check the validity of the specific form fields
        // we just need to check if the fields can be found
        var newBookNameField = document.getElementById("newBookName-" + collectionIdentifier);
        if (!newBookNameField) {
            throw new Error("The new book form's name input was not found! Did the template change?");
        }
        var newBookAuthorField = document.getElementById("newBookAuthor-" + collectionIdentifier);
        if (!newBookAuthorField) {
            throw new Error("The new book form's author input was not found! Did the template change?");
        }
        var newBookGenreSelect = document.getElementById("newBookGenre-" + collectionIdentifier);
        if (!newBookGenreSelect) {
            throw new Error("The new book form's genre select was not found! Did the template change?");
        }
        var newBookPagesField = document.getElementById("newBookPages-" + collectionIdentifier);
        if (!newBookPagesField) {
            throw new Error("The new book form's page input was not found! Did the template change?");
        }
        // optional
        var newBookPictureField = document.getElementById("newBookPicture-" + collectionIdentifier);
        if (!newBookPictureField) {
            throw new Error("The new book form's picture input was not found! Did the template change?");
        }
        var newBookDescriptionField = document.getElementById("newBookDescription-" + collectionIdentifier);
        if (!newBookDescriptionField) {
            throw new Error("The new book form's description input was not found! Did the template change?");
        }
        var newBookGenre = Genre[newBookGenreSelect.value];
        var newBookNumberOfPages = Number.parseInt(newBookPagesField.value);
        return {
            book: new Book(newBookNameField.value, newBookDescriptionField.value, newBookPictureField.value, newBookGenre, newBookAuthorField.value, newBookNumberOfPages)
        };
    };
    HTMLMediaManView.prototype.removeBook = function (collectionIdentifier, bookIdentifier) {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }
        if (!bookIdentifier) {
            throw new Error("The book identifier must be provided!");
        }
        var bookElement = document.getElementById("book-" + collectionIdentifier + "-" + bookIdentifier);
        if (!bookElement) {
            throw new Error("The element corresponding to the book to remove could not be found! Did the template change?");
        }
        bookElement.remove();
    };
    HTMLMediaManView.prototype.clearNewBookForm = function (collectionIdentifier) {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }
        var newBookForm = document.getElementById("newBook-" + collectionIdentifier);
        if (!newBookForm) {
            throw new Error("Could not find the new book form for collection " + collectionIdentifier);
        }
        newBookForm.reset();
    };
    HTMLMediaManView.prototype.clearNewBookCollectionForm = function () {
        this._newBookCollectionForm.reset();
    };
    return HTMLMediaManView;
}());
var MediaManControllerImpl = /** @class */ (function () {
    function MediaManControllerImpl(view, bookService, movieService) {
        this._bookCollections = new Map();
        this._movieCollections = new Map();
        if (!view) {
            throw new Error("The view is mandatory!");
        }
        if (!bookService) {
            throw new Error("The book service is mandatory!");
        }
        if (!movieService) {
            throw new Error("The movie service is mandatory!");
        }
        this._view = view;
        this._bookService = bookService;
        this._movieService = movieService;
        this.reloadBookCollections(); // reload saved data when the application starts
    }
    MediaManControllerImpl.prototype.reloadBookCollections = function () {
        var _this = this;
        this._bookService.getMediaCollectionIdentifiersList().then(function (keys) {
            _this._bookCollections.clear(); // clear the current state
            _this._view.clearBookCollections(); // remove the DOM nodes
            keys.forEach(function (key) {
                _this._bookService.loadMediaCollection(key).then(function (collection) {
                    _this._bookCollections.set(key, collection);
                    _this._view.renderBookCollection(collection);
                });
            });
        });
    };
    MediaManControllerImpl.prototype.createBookCollection = function () {
        var _this = this;
        var newBookCollectionName = this._view.getNewBookCollectionName();
        console.log("Creating a new book collection: ", newBookCollectionName);
        var newBookCollection = new MediaCollection(Book, newBookCollectionName);
        this._bookCollections.set(newBookCollection.identifier, newBookCollection);
        this._bookService.saveMediaCollection(newBookCollection).then(function () {
            console.log("New book collection called \"" + newBookCollection.name + "\" saved successfully. Identifier: ", newBookCollection.identifier);
            _this._view.clearNewBookCollectionForm();
            _this._view.renderBookCollection(newBookCollection);
        }).catch(function (_) {
            _this._view.displayErrorMessage("Failed to save the new book collection called " + newBookCollectionName);
        });
    };
    MediaManControllerImpl.prototype.removeBookCollection = function (identifier) {
        var _this = this;
        if (!identifier) {
            throw new Error("An identifier must be provided");
        }
        this._bookCollections.delete(identifier);
        this._view.removeBookCollection(identifier);
        this._bookService.removeMediaCollection(identifier).then(function () {
            console.log("Removed the collection with identifier: ", identifier);
        }).catch(function (_) {
            _this._view.displayErrorMessage("Failed to remove the collection!");
        });
    };
    MediaManControllerImpl.prototype.createBook = function (collectionIdentifier) {
        var _this = this;
        if (!collectionIdentifier) {
            throw new Error("The collection identifier is required to create a new book!");
        }
        console.log("Retrieving the details about the new book to create...");
        var bookDetailsResult = this._view.getNewBookDetails(collectionIdentifier);
        if (bookDetailsResult.error) {
            console.error("Failed to retrieve the book details: ", bookDetailsResult.error);
            return;
        }
        if (!this._bookCollections.has(collectionIdentifier) || !this._bookCollections.get(collectionIdentifier)) {
            console.error("Tried to add a book to an unknown collection. Identifier: ", collectionIdentifier);
            this._view.displayErrorMessage("Failed to create the new book!");
            return;
        }
        var existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection || !bookDetailsResult.book) {
            throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
        }
        var newBook = bookDetailsResult.book;
        existingCollection.addMedia(newBook);
        this._bookService.saveMediaCollection(existingCollection)
            .then(function () {
            console.log("Book collection called \"" + existingCollection.name + "\" updated successfully.");
            _this._view.clearNewBookForm(collectionIdentifier);
            _this._view.renderBook(existingCollection.identifier, newBook); // here we are sure that the book property is set
        })
            .catch(function (error) {
            console.error("Error while updating an existing book collection: ", error);
            _this._view.displayErrorMessage("Failed to update the existing book collection called " + existingCollection.name);
        });
    };
    MediaManControllerImpl.prototype.removeBook = function (collectionIdentifier, bookIdentifier) {
        var _this = this;
        if (!collectionIdentifier) {
            throw new Error("The collection identifier is required to remove a book!");
        }
        if (!bookIdentifier) {
            throw new Error("The book identifier is required to remove a book");
        }
        console.log("Removing book " + bookIdentifier + " which should be part of collection " + collectionIdentifier);
        var existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection) {
            throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
        }
        existingCollection.removeMedia(bookIdentifier);
        bookService.saveMediaCollection(existingCollection)
            .then(function () {
            console.log("Book collection called \"" + existingCollection.name + "\" updated successfully.");
            _this._view.removeBook(collectionIdentifier, bookIdentifier);
        })
            .catch(function (error) {
            console.error("Error while updating an existing book collection: ", error);
            _this._view.displayErrorMessage("Failed to save the modifications made to the " + existingCollection.name + " book collection (removal of the following book: " + bookIdentifier);
        });
    };
    return MediaManControllerImpl;
}());
var view = new HTMLMediaManView();
var bookService = new MediaServiceImpl(Book);
console.log("Book service initialized: ", bookService);
var movieService = new MediaServiceImpl(Movie);
console.log("Movie service initialized: ", movieService);
var mediaManController = new MediaManControllerImpl(view, bookService, movieService);
var customWindow = window;
customWindow.mediaManController = mediaManController;
console.log("MediaMan ready!", customWindow.mediaManController);
//# sourceMappingURL=mediaman.js.map