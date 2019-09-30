const observer = {
    next: (x:any) => console.log(`Observer got a next value: ${x}`),
    error: (err:any) => console.error(`Observer got an error: ${err}`),
    complete: () => console.log('Observer got a completion notification')
};