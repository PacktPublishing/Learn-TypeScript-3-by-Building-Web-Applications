'use strict';

function FullName(props) {
    render(React.createElement("span", null, props.givenName, " ", props.lastName));
}

const element = React.createElement("div", {
    id: "root"
}, React.createElement(FullName, {
    givenName: "Sebastien",
    lastName: "Dubois"
}), React.createElement(FullName, {
    givenName: "Alexis",
    lastName: "Georges"
}));

console.log(element);
