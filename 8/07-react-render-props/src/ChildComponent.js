import React from 'react';

export class ChildComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={() => this.props.onAdd(1)}>+1</button>
        );
    }
}
