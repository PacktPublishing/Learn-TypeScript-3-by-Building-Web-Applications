import "reflect-metadata";
import localForage from "localforage";
import {classToPlain, Expose, plainToClassFromExist, Type} from "class-transformer";

console.log("MediaMan - Loading...");

enum Genre {
    Horror = "Horror",
    Fantastic = "Fantastic",
    Thriller = "Thriller",
    Romance = "Romance",
    Fiction = "Fiction",
    ScienceFiction = "Science Fiction"
}

abstract class Media {
    private _identifier: string;

    protected constructor(
        private _name: string,
        private _description: string,
        private _pictureLocation: string,
        private _genre: Genre,
        identifier?: string
        ,
    ) {
        if (identifier) {
            this._identifier = identifier;
        } else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }

    @Expose()
    get identifier(): string {
        return this._identifier;
    }

    set identifier(identifier: string) {
        this._identifier = identifier;
    }

    @Expose()
    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    @Expose()
    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    @Expose()
    get pictureLocation(): string {
        return this._pictureLocation;
    }

    set pictureLocation(pictureLocation: string) {
        this._pictureLocation = pictureLocation;
    }

    @Expose()
    get genre(): Genre {
        return this._genre;
    }

    set genre(genre: Genre) {
        this._genre = genre;
    }
}

class Book extends Media {
    private _author: string;
    private _numberOfPages: number;

    constructor(
        name: string,
        description: string,
        pictureLocation: string,
        genre: Genre,
        author: string,
        numberOfPages: number,
        identifier?: string
    ) {
        super(name, description, pictureLocation, genre, identifier);
        this._numberOfPages = numberOfPages;
        this._author = author;
    }

    @Expose()
    get author(): string {
        return this._author;
    }

    set author(author: string) {
        this._author = author;
    }

    @Expose()
    @Type(() => Number)
    get numberOfPages(): number {
        return this._numberOfPages;
    }

    set numberOfPages(numberOfPages: number) {
        this._numberOfPages = numberOfPages;
    }
}

class Movie extends Media {
    private _duration: string;
    private _director: string;

    constructor(
        name: string,
        description: string,
        pictureLocation: string,
        genre: Genre,
        duration: string,
        director: string,
        identifier?: string
    ) {
        super(name, description, pictureLocation, genre, identifier);
        this._duration = duration;
        this._director = director;
    }

    @Expose()
    get director(): string {
        return this._director;
    }

    set director(director: string) {
        this._director = director;
    }

    @Expose()
    get duration(): string {
        return this._duration;
    }

    set duration(duration: string) {
        this._duration = duration;
    }
}

class MediaCollection<T extends Media> {
    private _identifier: string;
    private _name: string = "";
    private _collection: ReadonlyArray<T> = [];

    private readonly _type: Function;

    constructor(
        type: Function,
        name?: string,
        identifier?: string
    ) {
        this._type = type;

        if (name) {
            this._name = name;
        }

        if (identifier) {
            this._identifier = identifier;
        } else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }

    @Expose()
    get identifier(): string {
        return this._identifier;
    }

    set identifier(identifier: string) {
        this._identifier = identifier;
    }

    @Expose()
    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    @Expose()
    @Type(options => {
        if (options) {
            return (options.newObject as MediaCollection<T>)._type;
        } else {
            throw new Error("Cannot not determine the type because the options object is null or undefined");
        }
    })
    get collection(): ReadonlyArray<T> {
        return this._collection;
    }

    set collection(collection: ReadonlyArray<T>) {
        this._collection = collection;
    }

    addMedia(media: Readonly<T>): void {
        if (media) {
            this._collection = this._collection.concat(media);
        }
    }

    removeMedia(itemId: string) {
        if (itemId) {
            this._collection = this._collection.filter(item => {
                return item.identifier !== itemId;
            });
        }
    }
}

interface MediaService<T extends Media> {
    loadMediaCollection(identifier: string): Promise<MediaCollection<T>>

    saveMediaCollection(collection: Readonly<MediaCollection<T>>): Promise<void>

    getMediaCollectionIdentifiersList(): Promise<string[]>

    removeMediaCollection(identifier: string): Promise<void>
}

class MediaServiceImpl<T extends Media> implements MediaService<T> {
    private readonly _store: LocalForage;

    constructor(private _type: Function) {
        console.log(`Initializing media service for ${_type.name}`);

        // each instance of the media service has its own data store: https://github.com/localForage/localForage
        // the initialization options are described here: https://localforage.github.io/localForage/#settings-api-config
        this._store = localForage.createInstance({
            name: 'mediaMan',
            version: 1.0,
            storeName: `media-man-${_type.name}`, // we add the type name to the object store name!
            description: 'MediaMan data store'
        });
    }

    loadMediaCollection(identifier: string): Promise<MediaCollection<T>> {
        console.log(`Trying to load media collection with the following identifier: ${identifier}`);
        return new Promise<MediaCollection<T>>((resolve, reject) => {
            this._store.getItem(identifier)
                .then(value => {
                    console.log("Found the collection: ", value);

                    const retrievedCollection = plainToClassFromExist<MediaCollection<T>, any>(new MediaCollection<T>(this._type), value);

                    console.log("Retrieved collection: ", retrievedCollection);
                    resolve(retrievedCollection);
                })
                .catch(err => {
                    reject(err); // let the error through
                });
        });
    }

    saveMediaCollection(collection: Readonly<MediaCollection<T>>): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!collection) {
                reject(new Error("The list cannot be null or undefined!"));
            }

            console.log(`Saving media collection with the following name ${collection.name}`);

            const serializedVersion = classToPlain(collection, {excludePrefixes: ["_"]});
            console.log("Serialized version: ", serializedVersion);

            this._store.setItem(collection.identifier, serializedVersion)
                .then(value => {
                    console.log(`Saved the ${collection.name} collection successfully! Saved value: `, value);
                    resolve();
                })
                .catch(err => {
                    console.error(`Failed to save the ${collection.name} collection with identifier ${collection.identifier}. Error: ${err}`);
                    reject(err);
                });
        });
    }

    getMediaCollectionIdentifiersList(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            console.log("Retrieving the list of media collection identifiers");
            this._store.keys().then(keys => {
                console.log("Retrieved the of media collection identifiers: ", keys);
                resolve(keys);
            })
                .catch(err => {
                    console.error("Failed to retrieve the list of media collection identifiers. Error: ", err);
                    reject(err);
                })
        });
    }

    removeMediaCollection(identifier: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!identifier || '' === identifier.trim()) {
                reject(new Error("The identifier must be provided!"));
            }

            console.log(`Removing media collection with the following identifier ${identifier}`);

            this._store.removeItem(identifier)
                .then(() => {
                    console.log(`Removed the ${identifier} collection successfully!`);
                    resolve();
                })
                .catch(err => {
                    console.error(`Failed to removed the ${identifier} collection`);
                    reject(err);
                });
        });
    }
}

interface MediaManView {
    getNewBookCollectionName(): string;
    renderBookCollection(bookCollection: Readonly<MediaCollection<Book>>): void;
    displayErrorMessage(message: string): void;
    clearBookCollections(): void;
    removeBookCollection(identifier: string): void;
    getNewBookDetails(collectionIdentifier: string): { error?: string, book?: Readonly<Book> };
    renderBook(collectionIdentifier: string, book: Readonly<Book>): void;
    removeBook(collectionIdentifier: string, bookIdentifier: string): void;
    clearNewBookForm(collectionIdentifier: string): void;
    clearNewBookCollectionForm(): void;
}

class HTMLMediaManView implements MediaManView {
    private readonly _newBookCollectionForm: HTMLFormElement;
    private readonly _newBookCollectionName: HTMLInputElement;
    private readonly _bookCollectionsContainer: HTMLDivElement;

    private readonly _genreOptions: string = "";

    constructor() {
        this._newBookCollectionForm = document.getElementById('newBookCollection') as HTMLFormElement;
        this._newBookCollectionName = document.getElementById('newBookCollectionName') as HTMLInputElement;
        this._bookCollectionsContainer = document.getElementById("bookCollections") as HTMLDivElement;

        if (!this._newBookCollectionForm) {
            throw new Error("Could not initialize the view. The 'newBookCollection' element id was not found. Was the template changed?");
        }

        if (!this._newBookCollectionName) {
            throw new Error("Could not initialize the view. The 'newBookCollectionName' element id was not found. Was the template changed?");
        }

        if (!this._bookCollectionsContainer) {
            throw new Error("Could not initialize the view. The 'bookCollections' element id was not found. Was the template changed?");
        }

        for (let genreKey in Genre) {
            this._genreOptions += `<option value="${genreKey}">${Genre[genreKey]}</option>">`;
        }
    }

    getNewBookCollectionName(): string {
        // build upon standard HTML DOM validation
        if (this._newBookCollectionName.checkValidity() === false) {
            this._newBookCollectionName.reportValidity();
            throw new Error("Invalid collection name!");
        }
        return this._newBookCollectionName.value;
    }

    renderBook(collectionIdentifier: string, book: Readonly<Book>): void {
        if (!book) {
            throw new Error("The book to render must be provided!");
        }

        const collectionTableBody = document.getElementById(`collectionTableBody-${collectionIdentifier}`) as HTMLTableSectionElement;

        if (!collectionTableBody) {
            throw new Error(`The table body for collection ${collectionIdentifier} could not be found! Was the template changed?`);
        }

        const tableRow: HTMLTableRowElement = collectionTableBody.insertRow();

        tableRow.id = `book-${collectionIdentifier}-${book.identifier}`;

        tableRow.innerHTML = `
                <td>
                    <img class="mediaImage" src="${book.pictureLocation}">
                </td>
                <td>${book.name}</td>
                <td>${book.genre}</td>
                <td>${book.description}</td>
                <td>${book.author}</td>
                <td>${book.numberOfPages}</td>
                <td>
                    <a href="#" onclick="mediaManController.removeBook('${collectionIdentifier}','${book.identifier}');">X</a>
                </td>
        `;

        collectionTableBody.appendChild(tableRow);
    }

    renderBookCollection(bookCollection: Readonly<MediaCollection<Book>>): void {
        this._bookCollectionsContainer.innerHTML += `
        <div id="bookCollection-${bookCollection.identifier}" class="collection">
            <h3 class="collectionName">${bookCollection.name}</h3>

            <div class="containerGroup">
                <div class="container">
                    <h3>New book</h3>

                    <form id="newBook-${bookCollection.identifier}" action="#">
                        <ul>
                            <li>
                                <input id="newBookName-${bookCollection.identifier}" type="text" title="Name" placeholder="Name" required>
                                <input id="newBookAuthor-${bookCollection.identifier}" type="text" placeholder="Author" required>
                            </li>
                            <li>
                                <select id="newBookGenre-${bookCollection.identifier}" required>
                                    ${this._genreOptions}
                                </select>
                                <input id="newBookPages-${bookCollection.identifier}" type="number" placeholder="Pages" required>
                            </li>
                            <li>
                                <input id="newBookPicture-${bookCollection.identifier}" type="url" title="Picture" placeholder="Picture URL">
                            </li>
                            <li>
                                <textarea id="newBookDescription-${bookCollection.identifier}" placeholder="Description"></textarea>
                            </li>
                        </ul>
                        <input type="button" value="Create" onclick="mediaManController.createBook('${bookCollection.identifier}');" />
                    </form>
                </div>
                <div class="collectionToolsContainer">
                    <h3>Tools</h3>
                    <form action="#">
                        <input type="button" value="Remove collection" onclick="mediaManController.removeBookCollection('${bookCollection.identifier}');" />
                    </form>
                </div>
            </div>

            <div class="containerGroup">
                <div class="container">
                    <table class="collectionTable">
                        <thead>
                        <tr>
                            <td>Picture</td>
                            <td>Name</td>
                            <td>Genre</td>
                            <td>Description</td>
                            <td>Author</td>
                            <td>Pages</td>
                            <td>Remove</td>
                        </tr>
                        </thead>
                        <tbody id="collectionTableBody-${bookCollection.identifier}"></tbody>
                    </table>
                </div>
            </div>
        </div>
        `;

        bookCollection.collection.forEach(book => {
            this.renderBook(bookCollection.identifier, book);
        });
    }

    clearBookCollections(): void {
        this._bookCollectionsContainer.innerHTML = "";
    }

    removeBookCollection(identifier: string) {
        const bookCollectionDOMNode: HTMLDivElement = document.getElementById(`bookCollection-${identifier}`) as HTMLDivElement;
        if (!bookCollectionDOMNode) {
            throw new Error("Could not remove the book collection from the DOM. Couldn't find the DOM node");
        } else {
            bookCollectionDOMNode.remove();
        }
    }

    displayErrorMessage(errorMessage: string): void {
        if (!errorMessage) {
            throw new Error("An error message must be provided!");
        }
        alert(errorMessage); // bad user experience but ignore this for now
    }

    getNewBookDetails(collectionIdentifier: string): { error?: string, book?: Book } {
        if (!collectionIdentifier) {
            // we throw this one because it means that there is a bug!
            throw new Error("The collection identifier must be provided!");
        }

        // required
        const newBookForm = document.getElementById(`newBook-${collectionIdentifier}`) as HTMLFormElement;

        if (!newBookForm) {
            throw new Error(`Could not find the new book form for collection ${collectionIdentifier}`);
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
        const newBookNameField = document.getElementById(`newBookName-${collectionIdentifier}`) as HTMLInputElement;
        if (!newBookNameField) {
            throw new Error("The new book form's name input was not found! Did the template change?");
        }
        const newBookAuthorField = document.getElementById(`newBookAuthor-${collectionIdentifier}`) as HTMLInputElement;
        if (!newBookAuthorField) {
            throw new Error("The new book form's author input was not found! Did the template change?");
        }
        const newBookGenreSelect = document.getElementById(`newBookGenre-${collectionIdentifier}`) as HTMLSelectElement;
        if (!newBookGenreSelect) {
            throw new Error("The new book form's genre select was not found! Did the template change?");
        }
        const newBookPagesField = document.getElementById(`newBookPages-${collectionIdentifier}`) as HTMLInputElement;
        if (!newBookPagesField) {
            throw new Error("The new book form's page input was not found! Did the template change?");
        }

        // optional
        const newBookPictureField = document.getElementById(`newBookPicture-${collectionIdentifier}`) as HTMLInputElement;
        if (!newBookPictureField) {
            throw new Error("The new book form's picture input was not found! Did the template change?");
        }
        const newBookDescriptionField = document.getElementById(`newBookDescription-${collectionIdentifier}`) as HTMLTextAreaElement;
        if (!newBookDescriptionField) {
            throw new Error("The new book form's description input was not found! Did the template change?");
        }

        const newBookGenre = Genre[newBookGenreSelect.value as keyof typeof Genre];

        const newBookNumberOfPages = Number.parseInt(newBookPagesField.value);

        return {
            book: new Book(newBookNameField.value, newBookDescriptionField.value, newBookPictureField.value, newBookGenre, newBookAuthorField.value, newBookNumberOfPages)
        };
    }

    removeBook(collectionIdentifier: string, bookIdentifier: string) {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }

        if (!bookIdentifier) {
            throw new Error("The book identifier must be provided!");
        }

        const bookElement = document.getElementById(`book-${collectionIdentifier}-${bookIdentifier}`) as HTMLInputElement;
        if (!bookElement) {
            throw new Error("The element corresponding to the book to remove could not be found! Did the template change?");
        }

        bookElement.remove();
    }

    clearNewBookForm(collectionIdentifier: string): void {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier must be provided!");
        }

        const newBookForm = document.getElementById(`newBook-${collectionIdentifier}`) as HTMLFormElement;

        if (!newBookForm) {
            throw new Error(`Could not find the new book form for collection ${collectionIdentifier}`);
        }

        newBookForm.reset();
    }

    clearNewBookCollectionForm(): void {
        this._newBookCollectionForm.reset();
    }
}

interface MediaManController {
    createBookCollection(): void;
    reloadBookCollections(): void;
    removeBookCollection(identifier: string): void;
    createBook(collectionIdentifier: string): void;
    removeBook(collectionIdentifier: string, bookIdentifier: string): void;
}

class MediaManControllerImpl implements MediaManController {
    private readonly _view: MediaManView;
    private readonly _bookService: MediaService<Book>;
    private readonly _movieService: MediaService<Movie>;

    private _bookCollections: Map<string, MediaCollection<Book>> = new Map<string, MediaCollection<Book>>();
    private _movieCollections: Map<string, MediaCollection<Movie>> = new Map<string, MediaCollection<Movie>>();

    constructor(view: MediaManView, bookService: MediaService<Book>, movieService: MediaService<Movie>) {
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

    reloadBookCollections(): void {
        this._bookService.getMediaCollectionIdentifiersList().then(keys => {
            this._bookCollections.clear(); // clear the current state
            this._view.clearBookCollections(); // remove the DOM nodes
            keys.forEach(key => {
                this._bookService.loadMediaCollection(key).then(collection => {
                    this._bookCollections.set(key, collection);
                    this._view.renderBookCollection(collection);
                });
            });
        });
    }

    createBookCollection(): void {
        const newBookCollectionName: string = this._view.getNewBookCollectionName();

        console.log("Creating a new book collection: ", newBookCollectionName);

        const newBookCollection: MediaCollection<Book> = new MediaCollection<Book>(Book, newBookCollectionName);
        this._bookCollections.set(newBookCollection.identifier, newBookCollection);

        this._bookService.saveMediaCollection(newBookCollection).then(() => {
            console.log(`New book collection called "${newBookCollection.name}" saved successfully. Identifier: `, newBookCollection.identifier);
            this._view.clearNewBookCollectionForm();
            this._view.renderBookCollection(newBookCollection);
        }).catch(_ => {
            this._view.displayErrorMessage(`Failed to save the new book collection called ${newBookCollectionName}`);
        });
    }

    removeBookCollection(identifier: string): void {
        if (!identifier) {
            throw new Error("An identifier must be provided");
        }

        this._bookCollections.delete(identifier);
        this._view.removeBookCollection(identifier);
        this._bookService.removeMediaCollection(identifier).then(() => {
            console.log("Removed the collection with identifier: ", identifier);
        }).catch(_ => {
            this._view.displayErrorMessage("Failed to remove the collection!");
        });
    }

    createBook(collectionIdentifier: string): void {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier is required to create a new book!");
        }

        console.log("Retrieving the details about the new book to create...");

        const bookDetailsResult = this._view.getNewBookDetails(collectionIdentifier);

        if (bookDetailsResult.error) {
            console.error("Failed to retrieve the book details: ", bookDetailsResult.error);
            return;
        }

        if (!this._bookCollections.has(collectionIdentifier) || !this._bookCollections.get(collectionIdentifier)) {
            console.error("Tried to add a book to an unknown collection. Identifier: ", collectionIdentifier);
            this._view.displayErrorMessage("Failed to create the new book!");
            return;
        }

        const existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection || !bookDetailsResult.book) {
            throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
        }

        const newBook: Readonly<Book> = bookDetailsResult.book;

        existingCollection.addMedia(newBook);

        this._bookService.saveMediaCollection(existingCollection)
            .then(() => {
                console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
                this._view.clearNewBookForm(collectionIdentifier);
                this._view.renderBook(existingCollection.identifier, newBook); // here we are sure that the book property is set
            })
            .catch(error => {
                console.error("Error while updating an existing book collection: ", error);
                this._view.displayErrorMessage(`Failed to update the existing book collection called ${existingCollection.name}`);
            });
    }

    removeBook(collectionIdentifier: string, bookIdentifier: string): void {
        if (!collectionIdentifier) {
            throw new Error("The collection identifier is required to remove a book!");
        }

        if(!bookIdentifier) {
            throw new Error("The book identifier is required to remove a book");
        }

        console.log(`Removing book ${bookIdentifier} which should be part of collection ${collectionIdentifier}`);

        const existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection) {
            throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
        }

        existingCollection.removeMedia(bookIdentifier);
        bookService.saveMediaCollection(existingCollection)
            .then(() => {
                console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
                this._view.removeBook(collectionIdentifier, bookIdentifier);
            })
            .catch(error => {
                console.error("Error while updating an existing book collection: ", error);
                this._view.displayErrorMessage(`Failed to save the modifications made to the ${existingCollection.name} book collection (removal of the following book: ${bookIdentifier}`);
            });
    }
}

const view: HTMLMediaManView = new HTMLMediaManView();

const bookService = new MediaServiceImpl<Book>(Book);
console.log("Book service initialized: ", bookService);

const movieService = new MediaServiceImpl<Movie>(Movie);
console.log("Movie service initialized: ", movieService);

const mediaManController = new MediaManControllerImpl(view, bookService, movieService);

interface CustomWindow extends Window {
    mediaManController?: MediaManController
}

const customWindow: CustomWindow = window;
customWindow.mediaManController = mediaManController;

console.log("MediaMan ready!", customWindow.mediaManController);
