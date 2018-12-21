class TodoItem {
    private readonly _creationTimestamp: number;
    private readonly _identifier: string;

    constructor(private _description: string, identifier?: string) {
        this._creationTimestamp = new Date().getTime();

        if (identifier) {
            this._identifier = identifier;
        } else {
            // this is just for the example; for any real project, use
            // UUIDs instead: https://www.npmjs.com/package/uuid
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }

    get creationTimestamp(): number {
        return this._creationTimestamp;
    }

    get identifier(): string {
        return this._identifier;
    }

    get description(): string {
        return this._description;
    }
}

class TodoList {
    private _todoList: ReadonlyArray<TodoItem> = [];

    constructor(todoList?: TodoItem[]) {
        // first we make sure that we have received a valid array
        // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
        if(Array.isArray(todoList) && todoList.length) {
            this._todoList = this._todoList.concat(todoList);
        }
    }

    get todoList(): ReadonlyArray<TodoItem> {
        return this._todoList
    }

    addTodo(todoItem: TodoItem) {
        if(todoItem) {
            // the value is "truthy":
            // not null, not undefined, not NaN, not an empty string, not 0, not false
            this._todoList = this._todoList.concat(todoItem);
        }
    }

    removeTodo(itemId: string) {
        if(itemId) {
            this._todoList = this._todoList.filter(item => {
                if(item.identifier === itemId) {
                    return false; // drop
                } else {
                    return true; // keep
                }
            });
        }
    }
}

interface TodoListView {
    render(todoList: ReadonlyArray<TodoItem>): void;
    getInput(): TodoItem;
    getFilter(): string;
    clearInput(): void;
    filter(): void;
}

class HTMLTodoListView implements TodoListView {
    private readonly todoInput: HTMLInputElement;
    private readonly todoListDiv: HTMLDivElement;
    private readonly todoListFilter: HTMLInputElement;

    constructor() {
        this.todoInput = document.getElementById('todoInput') as HTMLInputElement;
        this.todoListDiv = document.getElementById('todoListContainer') as HTMLDivElement;
        this.todoListFilter = document.getElementById('todoFilter') as HTMLInputElement;

        // defensive checks
        if(!this.todoInput) {
            throw new Error("Could not find the todoInput HTML input element. Is the HTML correct?");
        }

        if(!this.todoListDiv) {
            throw new Error("Could not find the todoListContainer HTML div. Is the HTML correct?");
        }

        if(!this.todoListFilter) {
            throw new Error("Could not find the todoFilter HTML input element. Is the HTML correct?");
        }
    }

    clearInput(): void {
        this.todoInput.value = '';
    }

    getFilter(): string {
        return this.todoListFilter.value.toUpperCase();
    }

    getInput(): TodoItem {
        const todoInputValue: string = this.todoInput.value.trim();
        const retVal: TodoItem = new TodoItem(todoInputValue);
        return retVal;
    }

    render(todoList: ReadonlyArray<TodoItem>): void {
        console.log("Updating the rendered todo list");

        // we sort the given list
        const sortedTodoList = todoList.slice(0, todoList.length).sort((a, b) => {
            if(a.description < b.description) {
                return -1;
            } else if (a.description === b.description) {
                return 0;
            } else {
                return 1;
            }
        });

        this.todoListDiv.innerHTML = '';
        this.todoListDiv.textContent = ''; // Edge, ...

        const ul = document.createElement('ul');
        ul.setAttribute('id', 'todoList');
        this.todoListDiv.appendChild(ul);

        sortedTodoList.forEach(item => {
            const li = document.createElement('li');
            li.setAttribute('class','todo-list-item');
            li.innerHTML = `<a href='#' onclick='todoIt.removeTodo("${item.identifier}")'>${item.description}</a>`;
            ul.appendChild(li);
        });
    }

    filter(): void {
        console.log("Filtering the rendered todo list");

        const todoListHtml: HTMLUListElement = document.getElementById('todoList') as HTMLUListElement

        if (todoListHtml == null) {
            console.log("Nothing to filter");
            return;
        }

        const todoListFilterText = this.getFilter();

        todoListHtml.childNodes.forEach((item) => {
            let itemText: string | null = item.textContent;
            if (itemText !== null) {
                itemText = itemText.toUpperCase();

                if (itemText.startsWith(todoListFilterText)) {
                    (item as HTMLLIElement).style.display = "list-item";
                } else {
                    (item as HTMLLIElement).style.display = "none";
                }
            }
        });
    }
}

interface TodoListController {
    addTodo(): void;
    filterTodoList(): void;
    removeTodo(identifier: string): void;
}

class TodoIt implements TodoListController {
    private readonly _todoList: TodoList = new TodoList();

    constructor(private _todoListView: TodoListView) {
        console.log("TodoIt");

        if(!_todoListView) {
            throw new Error("The todo list view implementation is required to properly initialize TodoIt!");
        }
    }

    addTodo(): void {
        // get the value from the view
        const newTodo = this._todoListView.getInput();

        // verify that there is something to add
        if ('' !== newTodo.description) {
            console.log("Adding todo: ", newTodo);

            // add the new item to the list (i.e., update the model)
            this._todoList.addTodo(newTodo);

            console.log("New todo list: ", this._todoList.todoList);

            // clear the input
            this._todoListView.clearInput();

            // update the rendered todo list
            this._todoListView.render(this._todoList.todoList);

            // filter the list if needed
            this.filterTodoList();
        }
    }

    filterTodoList(): void {
        this._todoListView.filter();
    }

    removeTodo(identifier: string): void {
        if(identifier) {
            console.log("item to remove: ", identifier);
            this._todoList.removeTodo(identifier);
            this._todoListView.render(this._todoList.todoList);
            this.filterTodoList();
        }
    }
}

class EventUtils {
    static isEnter(event: KeyboardEvent): boolean {
        let isEnterResult = false;

        if(event !== undefined && event.defaultPrevented) {
            return false;
        }

        if (event == undefined) {
            isEnterResult = false;
        } else if (event.key !== undefined) {
            isEnterResult = event.key === 'Enter';
        } else if (event.keyCode !== undefined) {
            isEnterResult = event.keyCode === 13;
        }
        return isEnterResult;
    }
}

const view = new HTMLTodoListView();
const todoIt = new TodoIt(view);
