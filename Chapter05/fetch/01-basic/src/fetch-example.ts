const responsePromise: Promise<Response> =
    fetch('https://api.worldbank.org/v2/countries?format=json');

responsePromise
    .then((response: Response) => {
        if (response.status !== 200) {
            console.warn('Unexpected response status: ', response.statusText);
            return;
        }

        response.json()
            .then((jsonContent: unknown) => {
                console.log("Response content: ", jsonContent);
            }).catch((error: unknown) => {
            console.error("Failed to parse the response body as JSON: ", error);
        });
    })
    .catch((error: unknown) => {
        console.error("An error occurred while fetching the data: ", error);
    });
