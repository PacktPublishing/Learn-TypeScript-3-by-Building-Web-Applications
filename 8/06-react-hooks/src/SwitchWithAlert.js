import React, {useState, useEffect} from 'react';

export function Switch(props) {
    const [currentSwitchStatus, switchStatus] = useState(false);

    useEffect(() => {
        alert('The switch has been activated. Hopefully, this was not by mistake :)');
    });

    return (
        <div>
            <span>The switch is currently: {currentSwitchStatus? 'ON': 'OFF'} </span>
            <button onClick={() => switchStatus(!currentSwitchStatus)}>Change the value!</button>
        </div>
    );
}
