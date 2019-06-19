import React from 'react';
import ReactDOM from 'react-dom';

export class LifecycleAwareComponent extends React.Component {

    constructor(props) {
        super(props);

        console.log(`Constructor: Component instantiated. Props: ${JSON.stringify(this.props)}`);

        console.log(`Constructor: Initializing the state`);
        this.state = {
            currentValue: props.initialValue ? props.initialValue : 0,
        };

        console.log(`Constructor: State initialized: ${JSON.stringify(this.state)}`);
    }

    render() {
        return (
            <div>
                <span>Take a look at the console in the developer tools (F12)</span>

                <br/>
                <br/>
                <button onClick={() => this.changeState()}>Click here to change the state</button>
                <br/>
                <br/>
                <button onClick={() => LifecycleAwareComponent.removeAllComponents()}>Click here to remove all
                    components from the page
                </button>
            </div>
        );
    }

    // lifecycle hooks

    componentDidMount() {
        console.log('componentDidMount lifecycle hook called');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`componentDidUpdate lifecycle hook called: [previous props: ${JSON.stringify(prevProps)}], [previous state: ${JSON.stringify(prevState)}], [snapshot: ${JSON.stringify(snapshot)}]`);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount lifecycle hook called');
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(`getSnapshotBeforeUpdate lifecycle hook called: [prevProps: ${JSON.stringify(prevProps)}], [prevState: ${JSON.stringify(prevState)}]`);
        return { foo: "bar"};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(`getDerivedStateFromProps lifecycle hook called: [prevProps: ${JSON.stringify(nextProps)}], [prevState: ${JSON.stringify(prevState)}]`);
        return { foo: "bar"};
    }

    // utiliies (ignore these)
    changeState() {
        const newState = {currentValue: Math.floor(Math.random() * 1000000 + 1)};
        console.log(`Changing the state to ${JSON.stringify(newState)}`);
        this.setState(newState);
    }

    static removeAllComponents() {
        // Avoid doing this in real applications ;-)
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    }
}
