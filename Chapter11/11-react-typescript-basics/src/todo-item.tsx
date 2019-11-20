import React from 'react';

export interface TodoItem {
    id: string;
    description: string;
    done: boolean;
}

type Props = {
    todo: TodoItem;
    itemClicked: (id: string) => void;
};

export const TodoItem = (props: Props) => {
    const {todo} = props;

    return <li id={todo.id} onClick={() => props.itemClicked(todo.id)} style={{backgroundColor: 'gray', cursor: 'pointer'}}>{todo.description}</li>;
};
