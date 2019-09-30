import React from 'react';
import {ChildComponent} from "./ChildComponent";

export class ParentComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ChildComponent onAdd={this.add}/>
        );
    }

    add(value) {
        console.log(`Parent has received the following value: ${value}`);
    }
}
