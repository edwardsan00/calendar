"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changePrevMonth = changePrevMonth;
exports.changeNextMonth = changeNextMonth;
exports.getNewData = getNewData;
exports.renderViewCalendar = renderViewCalendar;
function changePrevMonth() {
    var newMoment = momentDefault;
    newMoment.subtract(1, "M");
    monthYearCalendar.textContent = getNewData(newMoment).newMonth + " " + getNewData(newMoment).newYear;
    renderViewCalendar(newMoment);
}
function changeNextMonth() {
    var newMoment = momentDefault;
    newMoment.add(1, "M");
    monthYearCalendar.textContent = getNewData(newMoment).newMonth + " " + getNewData(newMoment).newYear;
    renderViewCalendar(newMoment);
}

function getNewData(newMoment) {
    var data = {
        newYear: newMoment.format("YYYY"),
        newMonth: newMoment.format("MMM"),
        startMonth: newMoment.startOf("month"),
        firstDay: newMoment.day(),
        daysInMonth: newMoment.daysInMonth()
    };
    return data;
}
function renderViewCalendar(newMoment) {
    var daysInMonth = getNewData(newMoment).daysInMonth,
        firstDay = getNewData(newMoment).firstDay,
        arrFinal = [],
        arrDays = [],
        contDays = 0,
        emptyString = "",
        whiteSpace = 0;
    var grid = 42;
    //Clear all span with date
    for (var i = 0; i < widgetWeek.childElementCount; i++) {
        widgetWeek.children[i].innerHTML = "";
    }
    //append days of week in the array       
    for (var k = 1; k <= daysInMonth; k++) {
        arrDays.push(k);
    }
    //Conditional for the array that prints date
    for (var _i = 0; _i < grid; _i++) {
        //if i < firstDay add to finalarry a emptyString
        if (_i < firstDay) {
            arrFinal.push(emptyString);
            whiteSpace++;
        }
        //if i = firstDay add to finalarr initial date
        if (_i == firstDay) {
            arrFinal.push(arrDays[contDays]);
            contDays++;
        }
        if (_i > firstDay && _i < arrDays.length + whiteSpace) {
            arrFinal.push(arrDays[contDays]);
            contDays++;
        }
        if (_i > arrDays.length + whiteSpace) {
            arrFinal.push(emptyString);
        }
    }
    for (var _i2 = 0; _i2 < widgetWeek.childElementCount; _i2++) {
        widgetWeek.children[_i2].textContent = arrFinal[_i2];
    }
}