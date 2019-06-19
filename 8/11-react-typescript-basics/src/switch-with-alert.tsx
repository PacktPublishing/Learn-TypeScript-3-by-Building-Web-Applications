import React, {useEffect, useState} from 'react';

const defaultProps = Object.freeze({
    alertMessage: 'The switch has been activated. Hopefully, this was not by mistake :)',
});

type Props = {aMandatoryProp: string} & Partial<typeof defaultProps>;

export const SwitchWithAlert = (props: Props) => {
    const [currentSwitchStatus, switchStatus] = useState(false);

    console.log(`Mandatory prop provided: ${props.aMandatoryProp}`);

    useEffect(() => {
        alert('SwitchWithAlert Functional Component rendered');
        if(currentSwitchStatus) {
            alert(props.alertMessage);
        }
    });

    return (
        <div>
            <span>The switch is currently: {currentSwitchStatus? 'ON': 'OFF'}</span>
            <button onClick={() => switchStatus(!currentSwitchStatus)}>Change the value!</button>
        </div>
    );
};

SwitchWithAlert.defaultProps = defaultProps;
