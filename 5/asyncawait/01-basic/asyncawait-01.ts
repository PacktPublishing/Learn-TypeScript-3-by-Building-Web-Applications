async function makeCoffee(): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            console.log("Coffee is ready");
            resolve();
        }, 1000);
    });
}

async function main(): Promise<void> {
    await makeCoffee();
    console.log("The coffee has been prepared!")
}

main().then(() => {
    console.log("All done!");
});
