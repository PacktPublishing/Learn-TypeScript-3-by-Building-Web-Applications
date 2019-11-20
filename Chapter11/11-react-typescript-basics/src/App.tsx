import React from 'react';
import {Switch} from './switch';
import {HelloWorld} from './hello-world';
import {CustomizableButton} from './customizable-button';
import {SwitchWithAlert} from './switch-with-alert';
import {HelloWorldTSFunctionalComponent} from './hello-world-ts-functional-component';
import {TodoItem} from './todo-item';
import {TodoList} from "./todo-list";
import {Header} from "./Header";

export const App: React.FC = () => {
    return <div>
        <h1>Class components</h1>
        <HelloWorld/>
        <Switch/>
        <CustomizableButton />
        <CustomizableButton buttonText={'Click here for a surprise'} messageToDisplay={'Surprise!'}  />
        <br />
        <br />
        <h1>Functional components</h1>
        <HelloWorldTSFunctionalComponent />
        <SwitchWithAlert aMandatoryProp={'bla'} />
        <br />
        <h2>Todo item</h2>
        <TodoItem todo={{id: '1', description: 'Write one more page!', done: false}} itemClicked={(id: string) => alert(`Todo item clicked: ${id}`)}/>
        <br />
        <h2>Todo list</h2>
        <TodoList todos={[{id: '1', description: 'First', done: false}, {id: '2', description: 'Second', done: false}, {id: '3', description: 'Third', done: false}]}/>
        <br />
        <Header><h1>This is a title passed to the header</h1><h2>And this is a subtitle</h2></Header>
    </div>
};
