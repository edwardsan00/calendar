//(function(){


    //Days Vars
    var momentDefault = moment(),
        monthDefault = momentDefault.format("MMM"),
        yearDefault  = momentDefault.format("YYYY"),
        daysInMonthDefault = momentDefault.daysInMonth();


    //Global vars
    var color = [
        '#fc4e59',
        '#e01467',
        '#e21515',
        '#ec3800',
        '#f95b00',
        '#f56e00',
        '#ffb736',
        '#fced58',
        '#7cb51e',
        '#38e3cf',
        '#179c93',
        '#1c80cc',
        '#2264ff',
        '#0514ed',
        '#8a2aff',
        '#5800d2'];

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
        for(let j = 0; j < 42; j++){
            var widgetDay = document.createElement('span');
            widgetDay.className = 'widget__day';
            widgetWeek.appendChild(widgetDay);
        }

    //Functions
    var animate = (element, time = 10) =>{
        for(let i = 0; i <  element.length; i++){
            element[i].classList.add('fade-in', 'is-paused');
            (function(){
                var j = i;
                setTimeout(()=>{
                     element[j].classList.remove('is-paused');
                }, j * time);
            })();
        }
    }
    var renderViewCalendar = (newMoment) =>{
        var todayIs = {};
        let daysInMonth = getNewData(newMoment).daysInMonth,
            firstDay = getNewData(newMoment).firstDay,
            arrFinal = [],
            arrDays = [],
            contDays = 0,
            emptyString = "",
            whiteSpace = 0,
            today = parseInt(moment().format("DD"));
        const grid = 42;
        //Clear all span with date
        for(let i=0; i<(widgetWeek.childElementCount); i++){
            widgetWeek.children[i].innerHTML = "";
        }
        //append days of week in the array
        for(let k = 1; k <= daysInMonth; k++ ){
            arrDays.push(k);
        }
        //Conditional for the array that prints date
        for(let i = 0; i < grid; i++){
            //if i < firstDay add to finalarry a emptyString
            if(i < firstDay){
                arrFinal.push(emptyString);
                whiteSpace++;
            }
            //if i = firstDay add to finalarr initial date
            if(i == firstDay){
                arrFinal.push(arrDays[contDays]);
                contDays++;
            }
            if(i > firstDay && i < (arrDays.length + whiteSpace)){
                arrFinal.push(arrDays[contDays]);
                contDays++;
            }
            if(i > (arrDays.length + whiteSpace)){
                arrFinal.push(emptyString);
            }
        }
        for(let i=0; i<(widgetWeek.childElementCount); i++){
            widgetWeek.children[i].textContent = arrFinal[i];
        }
        widgetWeek.children[today+whiteSpace - 1].classList.add("today");
    }
    var changePrevMonth = () => {
        let newMoment = momentDefault;
        newMoment.subtract(1, "M");
        monthYearCalendar.textContent = `${getNewData(newMoment).newMonth} ${getNewData(newMoment).newYear}`;
        renderViewCalendar(newMoment);
    }
    var changeNextMonth = () => {
        let newMoment = momentDefault;
        newMoment.add(1, "M");
        monthYearCalendar.textContent = `${getNewData(newMoment).newMonth} ${getNewData(newMoment).newYear}`;
        renderViewCalendar(newMoment);
    }

    var getNewData = (newMoment) =>{
        var data = {
            newYear: newMoment.format("YYYY"),
            newMonth: newMoment.format("MMM"),
            startMonth: newMoment.startOf("month"),
            firstDay:  newMoment.day(),
            daysInMonth: newMoment.daysInMonth()
        }
        return data;
    }
    var pageColor = () =>{
        document.querySelector('.widget__page-color').classList.remove('desactive');
        document.querySelector('.widget__page-calendar').classList.add('desactive');
        let colors = document.querySelector('.widget__choose-color').children;
        animate(colors);
    }
    var closeColor = () =>{
        document.querySelector('.widget__page-calendar').classList.remove('desactive');
        document.querySelector('.widget__page-color').classList.add('desactive');
    }
    var elegirColor = () =>{
        document.querySelector('body').style.backgroundColor = [i];
    }
    var openFeatures = () =>{
        document.querySelector('.widget__page-calendar').classList.add("desactive");
        document.querySelector('.widget__page-weather').classList.remove("desactive");
        let more = document.querySelector('.widget__more').children;
        let location = document.querySelector('.widget__location'),
            humidity = document.querySelector('.widget__humidity');
        animate(more, 100);
        animate(location, 200);
        animate(humidity, 200);
        circleColor.textContent = itsToday.textContent;
    }
    var getBack = () =>{
        document.querySelector('.widget__page-weather').classList.add("desactive");
        document.querySelector('.widget__page-calendar').classList.remove("desactive");
    }

    //Cicle color animate
    for(let i = 0; i < chooseColor.childElementCount; i++){
        var desactiveColor = () =>{
            for(let i = 0; i < chooseColor.childElementCount; i++){
                var iteration = chooseColor.children[i];
                if(iteration.classList.value.includes("activeColor")){
                    iteration.classList.remove("activeColor");
                }
            }
        }
        chooseColor.children[i].addEventListener('click', (e)=>{
            let element = e.target;
             if(!element.classList.value.includes("activeColor")){
                desactiveColor();
                element.classList.add("activeColor");
             }
            document.querySelector('body').style.backgroundColor = color[i];
            btnColor.style.color = color[i];
            monthYearCalendar.style.color = color[i];
            circleColor.style.backgroundColor = color[i];
            itsToday.style.backgroundColor = color[i];
            itsToday.style.borderColor = color[i];
            for(let j = 0; j < iconsFeatures.length; j++){
                iconsFeatures[j].style.color = color[i];
            }
        });
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
    monthYearCalendar.textContent = `${monthDefault} ${yearDefault}`;
    renderViewCalendar(momentDefault);


        //Search element with class today and get this element
    for(let i=0; i<(widgetWeek.childElementCount); i++){
            //console.log(widgetWeek.children[i]);
            if(widgetWeek.children[i].classList.value.includes("today")){
               itsToday = widgetWeek.children[i];
            }
    }
//})();
