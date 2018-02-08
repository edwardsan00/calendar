"use strict";

//(function(){


//Days Vars
var momentDefault = moment(),
    monthDefault = momentDefault.format("MMM"),
    yearDefault = momentDefault.format("YYYY"),
    daysInMonthDefault = momentDefault.daysInMonth();

//Global vars
var color = ['#fc4e59', '#e01467', '#e21515', '#ec3800', '#f95b00', '#f56e00', '#ffb736', '#fced58', '#7cb51e', '#38e3cf', '#179c93', '#1c80cc', '#2264ff', '#0514ed', '#8a2aff', '#5800d2'];

//DOM Vars
var monthYearCalendar = document.getElementById('monthYearCalendar'),
    prevMonth = document.getElementById('prevMonth'),
    nextMonth = document.getElementById('nextMonth'),
    contentCalendar = document.getElementById('contentDate'),
    btnClose = document.getElementById('btnClose'),
    btnColor = document.getElementById('btnColor'),
    btnFeatures = document.getElementById('btnFeatures'),
    btnBack = document.getElementById('btnBack'),
    chooseColor = document.getElementById('chooseColor'),
    circleColor = document.querySelector('.widget__circle-date'),
    iconsFeatures = document.querySelectorAll('.widget__feature-description > i');
var itsToday;

//Creando el contenedor widget__week y anexando los span que contienen los dias
var widgetWeek = document.createElement("div");
widgetWeek.className = 'widget__week';
contentCalendar.appendChild(widgetWeek);
for (var j = 0; j < 42; j++) {
    var widgetDay = document.createElement('span');
    widgetDay.className = 'widget__day';
    widgetWeek.appendChild(widgetDay);
}

//Functions
var animate = function animate(element) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    var _loop = function _loop(_i) {
        element[_i].classList.add('fade-in', 'is-paused');
        (function () {
            var j = _i;
            setTimeout(function () {
                element[j].classList.remove('is-paused');
            }, j * time);
        })();
    };

    for (var _i = 0; _i < element.length; _i++) {
        _loop(_i);
    }
};
var renderViewCalendar = function renderViewCalendar(newMoment) {
    var todayIs = {};
    var daysInMonth = getNewData(newMoment).daysInMonth,
        firstDay = getNewData(newMoment).firstDay,
        arrFinal = [],
        arrDays = [],
        contDays = 0,
        emptyString = "",
        whiteSpace = 0,
        today = parseInt(moment().format("DD"));
    var grid = 42;
    //Clear all span with date
    for (var _i2 = 0; _i2 < widgetWeek.childElementCount; _i2++) {
        widgetWeek.children[_i2].innerHTML = "";
    }
    //append days of week in the array
    for (var k = 1; k <= daysInMonth; k++) {
        arrDays.push(k);
    }
    //Conditional for the array that prints date
    for (var _i3 = 0; _i3 < grid; _i3++) {
        //if i < firstDay add to finalarry a emptyString
        if (_i3 < firstDay) {
            arrFinal.push(emptyString);
            whiteSpace++;
        }
        //if i = firstDay add to finalarr initial date
        if (_i3 == firstDay) {
            arrFinal.push(arrDays[contDays]);
            contDays++;
        }
        if (_i3 > firstDay && _i3 < arrDays.length + whiteSpace) {
            arrFinal.push(arrDays[contDays]);
            contDays++;
        }
        if (_i3 > arrDays.length + whiteSpace) {
            arrFinal.push(emptyString);
        }
    }
    for (var _i4 = 0; _i4 < widgetWeek.childElementCount; _i4++) {
        widgetWeek.children[_i4].textContent = arrFinal[_i4];
    }
    widgetWeek.children[today + whiteSpace - 1].classList.add("today");
};
var changePrevMonth = function changePrevMonth() {
    var newMoment = momentDefault;
    newMoment.subtract(1, "M");
    monthYearCalendar.textContent = getNewData(newMoment).newMonth + " " + getNewData(newMoment).newYear;
    renderViewCalendar(newMoment);
};
var changeNextMonth = function changeNextMonth() {
    var newMoment = momentDefault;
    newMoment.add(1, "M");
    monthYearCalendar.textContent = getNewData(newMoment).newMonth + " " + getNewData(newMoment).newYear;
    renderViewCalendar(newMoment);
};

var getNewData = function getNewData(newMoment) {
    var data = {
        newYear: newMoment.format("YYYY"),
        newMonth: newMoment.format("MMM"),
        startMonth: newMoment.startOf("month"),
        firstDay: newMoment.day(),
        daysInMonth: newMoment.daysInMonth()
    };
    return data;
};
var pageColor = function pageColor() {
    document.querySelector('.widget__page-color').classList.remove('desactive');
    document.querySelector('.widget__page-calendar').classList.add('desactive');
    var colors = document.querySelector('.widget__choose-color').children;
    animate(colors);
};
var closeColor = function closeColor() {
    document.querySelector('.widget__page-calendar').classList.remove('desactive');
    document.querySelector('.widget__page-color').classList.add('desactive');
};
var elegirColor = function elegirColor() {
    document.querySelector('body').style.backgroundColor = [i];
};
var openFeatures = function openFeatures() {
    document.querySelector('.widget__page-calendar').classList.add("desactive");
    document.querySelector('.widget__page-weather').classList.remove("desactive");
    var more = document.querySelector('.widget__more').children;
    var location = document.querySelector('.widget__location'),
        humidity = document.querySelector('.widget__humidity');
    animate(more, 100);
    animate(location, 200);
    animate(humidity, 200);
    circleColor.textContent = itsToday.textContent;
};
var getBack = function getBack() {
    document.querySelector('.widget__page-weather').classList.add("desactive");
    document.querySelector('.widget__page-calendar').classList.remove("desactive");
};

//Cicle color animate

var _loop2 = function _loop2(_i5) {
    desactiveColor = function desactiveColor() {
        for (var _i7 = 0; _i7 < chooseColor.childElementCount; _i7++) {
            var iteration = chooseColor.children[_i7];
            if (iteration.classList.value.includes("activeColor")) {
                iteration.classList.remove("activeColor");
            }
        }
    };

    chooseColor.children[_i5].addEventListener('click', function (e) {
        var element = e.target;
        if (!element.classList.value.includes("activeColor")) {
            desactiveColor();
            element.classList.add("activeColor");
        }
        document.querySelector('body').style.backgroundColor = color[_i5];
        btnColor.style.color = color[_i5];
        monthYearCalendar.style.color = color[_i5];
        circleColor.style.backgroundColor = color[_i5];
        itsToday.style.backgroundColor = color[_i5];
        itsToday.style.borderColor = color[_i5];
        for (var _j = 0; _j < iconsFeatures.length; _j++) {
            iconsFeatures[_j].style.color = color[_i5];
        }
    });
};

for (var _i5 = 0; _i5 < chooseColor.childElementCount; _i5++) {
    var desactiveColor;

    _loop2(_i5);
}

//Events

//Change Month to calendar
nextMonth.addEventListener('click', changeNextMonth);
prevMonth.addEventListener('click', changePrevMonth);
btnColor.addEventListener('click', pageColor);
btnClose.addEventListener('click', closeColor);
btnFeatures.addEventListener('click', openFeatures);
btnBack.addEventListener('click', getBack);

//View
//Add Month and Year to Calendar View
monthYearCalendar.textContent = monthDefault + " " + yearDefault;
renderViewCalendar(momentDefault);

//Search element with class today and get this element
for (var _i6 = 0; _i6 < widgetWeek.childElementCount; _i6++) {
    //console.log(widgetWeek.children[i]);
    if (widgetWeek.children[_i6].classList.value.includes("today")) {
        itsToday = widgetWeek.children[_i6];
    }
}
//})();
