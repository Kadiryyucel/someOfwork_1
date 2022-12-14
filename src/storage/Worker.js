import moment from "moment";

const key = "personByMonth";
const people = [
    {
        user: {first: 'John', last: 'Doe'},
        personalId: 1,
        workDays: []
    },
    {
        user: {first: 'Jane', last: 'Doe'},
        personalId: 2,
        workDays: []
    },
    {
        user: {first: 'Rubin', last: 'Kincade'},
        personalId: 3,
        workDays: []
    },
    {
        user: {first: 'Shirley', last: 'Partridge'},
        personalId: 4,
        workDays: []
    },
    {
        user: {first: 'Tony', last: 'Stark'},
        personalId: 5,
        workDays: []
    },
    {
        user: {first: 'Scarlett', last: 'Johansson'},
        personalId: 6,
        workDays: []
    },
    {
        user: {first: 'Bryan', last: 'Cranston'},
        personalId: 7,
        workDays: []
    },
    {
        user: {first: 'Aaron', last: 'Paul'},
        personalId: 8,
        workDays: []
    },
    {
        user: {first: 'Aaron', last: 'Paul'},
        personalId: 9,
        workDays: []
    },
    {
        user: {first: 'Holmes', last: 'Watson'},
        personalId: 10,
        workDays: []
    }
];
const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

function createPeopleByData() {
    let data = getPeopleByData()
    if (data.length > 0) return
    setDataPerson(people)
}

function getPeopleByData() {
    let people = localStorage.getItem(key);
    if (people == null) return []
    return JSON.parse(people);
}

/**
 *
 * @param from {String} example:10.08.2022
 * @param to {String} example: 17.08.2022
 */
function getWorkers(from, to) {
    let people = getWorkersFromLocalStorage()
    var data = [];
    var dates = [];
    let fromDate = new Date(moment(from,"DD.MM.YYYY").format("MM.DD.YYYY"));
    let toDate = new Date(moment(to,"DD.MM.YYYY").format("MM.DD.YYYY"));
    for (let person of people) {
        dates = person.workDays.filter((workDay) => {
            let dayDate = new Date(moment(workDay.day,"DD.MM.YYYY").format("MM.DD.YYYY"));
            return fromDate <= dayDate && toDate >= dayDate;
        })
        data = [...data, {...configPerson(person, from, to), ...configDisplayDays(moment(from, "DD.MM.YYYY").format("MM.DD.YYYY"), dates)}];

    }
    return data;
}

function configDisplayDays(from, dates) {
    var newDate = from;
    var collection = {};
    for (let i = 0; i < 8; i++) {
        let day = dates.find(x => {
            return x.day == moment(newDate).format("DD.MM.YYYY")
        });
        let date = new Date(moment(new Date(newDate)).format("MM.DD.YYYY"));
        let value = 0;
        if (day != null) {
            value = day.value
        }
        newDate = moment(new Date(date.setDate(date.getDate() + 1))).format("MM.DD.YYYY");
        collection = {...collection, ...{["day" + i]: value}}
    }
    return collection
}

function configPerson(person, from, to) {
    var workingHours = 0;
    let fromDate = new Date(configDate(from));
    let toDate = new Date(configDate(to))

    workingHours = person.workDays.reduce((t, v) => {
        let selectedDays = new Date(configDate(v.day));
        if ( toDate>= selectedDays && selectedDays >= fromDate) return {value: t.value + v.value}
        else return {value:t.value}
    }, {value:0}).value;

    function configDate(dateString){
        return moment(dateString,"DD.MM.YYYY").format("MM.DD.YYYY")
    }
    console.log(workingHours)
    workingHours = workingHours ? workingHours : 0;
    let workingDays = workingHours ? (workingHours / 8).toFixed(1) : (0.0).toFixed(1);
    let notComeDays = workingDays ? (8 - workingDays).toFixed(1) : (0.0).toFixed(1);
    return {
        ...person,
        workingHours: workingHours,
        workingDays: workingDays,
        notComeDay: notComeDays
    }
}

/**
 *
 * @param from {String} example:10.08.2022
 * @param to {String} example: 17.08.2022
 */
function getDates(from) {
    var addDate = new Date(moment(from, "DD.MM.YYYY").format("MM.DD.YYYY"));
    var collection = [];
    for (let i = 0; i < 8; i++) {
        let dateMonth = monthNames[addDate.getMonth()]
        let newDate = addDate;
        collection = [...collection, {
            label: configLabel(addDate) + " " + dateMonth,
            thClass: (newDate.getDay() == 6 || newDate.getDay() == 0) ? 'months bc-weekend' : "months",
            tdClass: (newDate.getDay() == 6 || newDate.getDay() == 0) ? 'operation-center disable-weekend' : 'operation-center',
            date: `${configDay(addDate)}.${configMonth(addDate)}.${addDate.getFullYear()}`
        }];
        addDate = fowardDate(addDate)
    }
    return collection
}

function configLabel(date) {
    let value = moment(date, "DD.MM.YYYY").date();
    return moment(date, "DD.MM.YYYY").date().toString().length > 1 ? value : "0" + value
}

function fowardDate(addDate) {
    return new Date(moment(addDate.setDate(addDate.getDate() + 1)).format('MM.DD.YYYY'));
}

function configDay(date) {
    if (date.getDate().toString().length > 1) {
        return date.getDate()
    } else {
        return "0" + date.getDate()
    }
}

function configMonth(date) {
    if ((date.getMonth() + 1).toString().length > 1) {
        return date.getMonth() + 1
    } else {
        return "0" + (date.getMonth() + 1)
    }
}

function getWorkersFromLocalStorage() {
    let people = localStorage.getItem(key);
    if (people == null) return []
    return JSON.parse(people);
}

function updateWorkerHour({id, date, value}) {
    var people = getPeopleByData()
    let indexPerson = people.findIndex(person => person.personalId == id);
    if (someDateOfWorker(people, indexPerson, date, value)) return
    if (value == 0) {
        people = people[indexPerson].workDays.filter(workDay => workDay.day != date)
        setDataPerson(people)
        return
    }
    people[indexPerson].workDays = [...people[indexPerson].workDays, {day: date, value: value}]
    setDataPerson(people)
}

function someDateOfWorker(people, index, date, value) {

    let indexSomeDate = people[index].workDays.findIndex(workDay => workDay.day == date)
    if (indexSomeDate != -1) people[index].workDays[indexSomeDate] = {day: date, value: value}
    setDataPerson(people)
    if (indexSomeDate != -1) return true
    else false
}

function setDataPerson(data) {
    localStorage.setItem(key, JSON.stringify(data))
}

export default {
    createPeopleByData,getWorkersFromLocalStorage, getWorkers, updateWorkerHour, getDates
}