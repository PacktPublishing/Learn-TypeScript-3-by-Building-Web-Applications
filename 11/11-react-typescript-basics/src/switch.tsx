import React, {Component} from 'react';

type Props = {};

const initialState = Object.freeze({
    currentSwitchStatus: false,
});

type State = typeof initialState;

export class Switch extends Component<Props, State> {
    readonly state = initialState;

    render() {
        const {currentSwitchStatus} = this.state;

        return <div>
            <span>The switch is currently: {currentSwitchStatus ? 'ON' : 'OFF'} </span>
            <button onClick={() => this.switchStatus()}>Change the value!</button>
        </div>
    }

    switchStatus = () => {
        this.setState((state: State, _: Props) => {
            return {currentSwitchStatus: !state.currentSwitchStatus};
        });
    }
}
