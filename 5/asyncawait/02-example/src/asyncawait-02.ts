async function checkResponseStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

async function toJSON(response: Response): Promise<Response> {
    return response.json();
}

async function loadData(): Promise<unknown> {
    const response = await fetch('https://api.worldbank.org/v2/countries?format=json');
    const checkedResponse = await checkResponseStatus(response);
    const jsonContent: unknown = await toJSON(checkedResponse);

    return Promise.resolve(jsonContent);
}

loadData()
    .then((jsonContent: unknown) => {
        console.log("Response content: ", jsonContent);
    })
    .catch((error: unknown) => {
        console.error("An error occurred while fetching the data: ", error);
    });
