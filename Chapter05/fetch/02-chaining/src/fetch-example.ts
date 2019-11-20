function checkResponseStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function toJSON(response: Response): Promise<Response> {
    return response.json();
}

const responsePromise: Promise<Response> =
    fetch('https://api.worldbank.org/v2/countries?format=json');

responsePromise
    .then(checkResponseStatus)
    .then(toJSON)
    .then((jsonContent: unknown) => {
        console.log("Response content: ", jsonContent);
    })
    .catch((error: unknown) => {
        console.error("An error occurred while fetching the data: ", error);
    });
