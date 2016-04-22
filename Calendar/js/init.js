/**
 * 初始化时的任务：1、把selections设为今天
 * 2、初始化下拉列表,并绑定相关事件
 * 3、渲染当前所在月的日历
 *
 */
define(["renderCalendar", "EventUtil"], function(renderCalendar, EventUtil) {
    var nowDate = new Date(),
        year = document.querySelector("#year"),
        month = document.querySelector("#month"),
        vacation = document.querySelector("#vacation"),
        currentYear = document.querySelector("#current-year"),
        currentMonth = document.querySelector("#current-month"),
        displayVacation = document.querySelector("#display-vacation"),
        yearList = document.querySelector("#year-list"),
        monthList = document.querySelector("#month-list");

    var init = function() {
        //初始化当前显示的年、月
        setSelections();
        //初始化下拉列表
        initULs();
        //初始化渲染万年历
        renderCalendar.render(parseInt(currentYear.innerHTML), parseInt(currentMonth.innerHTML),
            displayVacation);
        //初始化事件绑定
        handleEvent();
    };

    /**
     * 把selections设为今天
     */
    function setSelections() {
        currentYear.innerHTML = nowDate.getFullYear() + "年";
        currentMonth.innerHTML = parseInt(nowDate.getMonth()) + 1 + "月";
    }

    /**
     * 渲染下拉列表
     */
    function initULs() {
        var fragment = document.createDocumentFragment(),
            li = null;
        for(var i=1900; i<2051; i++) {
            li = document.createElement("li");
            li.innerHTML = i + "年";
            fragment.appendChild(li);
        }
        yearList.appendChild(fragment);
        yearList.scrollTop = "2800";

        for(var j=1; j<13; j++) {
            li = document.createElement("li");
            li.innerHTML = j + "月";
            fragment.appendChild(li);
        }
        monthList.appendChild(fragment);
    }

    /**
     * 初始化各种事件绑定
     */
    function handleEvent() {
        document.onclick = EventUtil.eventHandler;
    }

    console.log("Writed By YL Cui");
    return {
        init: init
    };
});