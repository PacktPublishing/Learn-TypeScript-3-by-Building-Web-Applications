import React from 'react';
import {TodoItem} from './todo-item';

type Props = {
    todos: readonly TodoItem[];
};

export const TodoList = ({todos}: Props) => {
    const items: JSX.Element[] = todos.map(todo => <TodoItem todo={todo} itemClicked={(id) => alert(`Todo item clicked: ${id}`)} />);

    return <div>{items}</div>
};
