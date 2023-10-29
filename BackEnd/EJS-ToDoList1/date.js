module.exports.getDate = getDate;

function getDate(){
    var today = new Date();

    var options = {
        weekday : "long",
        day : "numeric",
        year : "numeric",
        month : "long"
    };

    let date = today.toLocaleDateString("en-US",options);
    return date;
}

module.exports.getDay = getDay;

function getDay(){
    var today = new Date();

    var options = {
        weekday : "long",
    };

    let day = today.toLocaleDateString("en-US",options);
    return day;
}

