/*
处理各种事件
 */
define(["renderCalendar", "vacationArrange"], function(renderCalendar, vacationArrange) {
    var ulSelections = document.querySelectorAll(".ul-selection"),
        currentYear = document.querySelector("#current-year"),
        currentMonth = document.querySelector("#current-month"),
        vacation = document.querySelector("#vacation"),
        displayVacation = document.querySelector("#display-vacation"),
        event, target, targetID, tagName, td;
    //根据不同的事件，用相应的函数处理
    function eventHandler() {
        event = arguments[0] || window.event;
        event.stopPropagation();
        target = event.target || event.srcElement;
        targetID = target.id;
        tagName = target.tagName.toLowerCase();

        if(targetID==="current-year" || targetID==="current-month"
            || targetID==="display-vacation") {
            selectionsEvent();
        } else if(tagName === "li") {
            ulEvent();
        } else {
            for(var i=0; i<ulSelections.length; i++) {
                ulSelections[i].classList.add("hidden");
            }
        }

        if(targetID === "today") {
            todayButtonEvent();
        } else if(tagName === "td"){
            tdEvent();
        }


    }

    /**
     * 处理显示下拉事件
     */
    function selectionsEvent() {

        for(var i=0; i<ulSelections.length; i++) {
            ulSelections[i].classList.add('hidden');
        }
        target.nextElementSibling.classList.remove("hidden");


    }

    /**
     * 处理下拉列表中的事件
     */
    function ulEvent() {
        target.parentNode.previousElementSibling.innerHTML = target.innerHTML;
        target.parentNode.classList.toggle("hidden");
        if(target.parentNode.id === "vacation-list" &&
            vacationArrange.restDays.hasOwnProperty(target.innerHTML)) {
            var restDate = new Date(vacationArrange.restDays[target.innerHTML][0]);
            currentMonth.innerHTML = restDate.getMonth() + 1 + "月";
            currentYear.innerHTML = restDate.getFullYear() + "年";

        } else {
            displayVacation.innerHTML = "2016假期安排";
        }
        renderCalendar.render(parseInt(currentYear.innerHTML), parseInt(currentMonth.innerHTML));
    }

    /**
     * “今天”按钮
     */
    function todayButtonEvent() {
        var nowDate = new Date(),
            nowYear = nowDate.getFullYear(),
            nowMonth = nowDate.getMonth();
        currentYear.innerHTML = nowYear + "年";
        currentMonth.innerHTML = nowMonth + 1 + "月";
        displayVacation.innerHTML = "2016假期安排";
        renderCalendar.render(nowYear, nowMonth+1);
    }

    /**
     * 万年历中的事件
     */
    function tdEvent() {
        var clickDate;
        if(td) {
            td.classList.remove("clickBg");
        }
        target.classList.add("clickBg");
        td = target;
        clickDate = new Date(td.dataset.date);
        renderCalendar.renderDetail(clickDate);
    }
    return {
        eventHandler: eventHandler
    };
});