'use strict';

const createElement = React.createElement;

class SayHiButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonClicked: false,
        };
    }

    render() {
        console.log('Rendering');
        if (this.state.buttonClicked) {
            console.log('The buttonClicked property of the state is true; showing the message');
            return 'Hello from React!';
        }

        return createElement(
            'button',
            {
                onClick: () => {
                    console.log("The button's click handler was clicked. Changing the state of the component");
                    this.setState({
                        buttonClicked: true,
                    }, null)
                }
            },
            'Say hi!' // button's text
        );
    }
}

const domContainer = document.querySelector('#hello-react-container');
ReactDOM.render(createElement(SayHiButton), domContainer);
