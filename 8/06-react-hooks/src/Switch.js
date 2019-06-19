import React, {useState} from 'react';

export function Switch(props) {
    const [currentSwitchStatus, switchStatus] = useState(false);

    return (
        <div>
            <span>The switch is currently: {currentSwitchStatus? 'ON': 'OFF'} </span>
            <button onClick={() => switchStatus(!currentSwitchStatus)}>Change the value!</button>
        </div>
    );
}
