enum Month {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

const june: Month = Month.June;
const nameOfJuneEntry: string = Month[june];

console.log(nameOfJuneEntry); // June