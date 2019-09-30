import React, {Component} from 'react';

const defaultProps = Object.freeze({
    buttonText: "DEFAULT BUTTON TEXT",
    messageToDisplay: "DEFAULT MESSAGE",
});

type Props = typeof defaultProps;

type State = {};

export class CustomizableButton extends Component<Props, State> {
    readonly state = {};
    static readonly defaultProps = defaultProps;

    render() {
        const {buttonText} = this.props;
        const {messageToDisplay} = this.props;

        return <div>
            <input type="button" value={buttonText} onClick={() => window.alert(messageToDisplay)} />
        </div>
    }
}
