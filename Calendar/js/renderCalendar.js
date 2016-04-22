define(["CNCalendar", "vacationArrange"], function(CNCalendar, vacationArrange) {
    var tr, td,
        tbody = document.querySelector("#calendar").querySelectorAll("tbody")[0],
        rightDate = document.querySelector("#right-date"),
        rightDay = document.querySelector("#right-day"),
        rightCNDate = document.querySelector("#right-cn-date"),
        week = ["七", "一", "二", "三", "四", "五", "六"];
    /**
     *
     * @param currentYear
     * @param currentMonth：传入值为1~12
     */
    var renderCal = function(currentYear, currentMonth) {
        var fragment = document.createDocumentFragment(),
            //获得需要渲染的年、月
            date = new Date(currentYear+'/'+currentMonth+'/1'),
            //一天的毫秒数
            oneDay = 1000*60*60*24,
            //first表日历中的第一天，displayDate表每个单元格中展示的事件，CNCalendarDay表农历时间
            firstDay, index = 0, displayDate, CNCalendarDay, rest, work, vacationIndex;
        //根据当月1日的星期不同，从而firstDay不同
        if(date.getDay() === 0) {
            firstDay = new Date(date.getTime() - 6*oneDay);
        } else {
            firstDay = new Date(date.getTime() - (date.getDay()-1)*oneDay);
        }
        //整个calendar有5行7列
        for(var i=0; i<5; i++) {
            tr = document.createElement("tr");
            for(var j=0; j<7; j++) {
                td = document.createElement("td");
                //没循环一次时间就从当前日历的第一天往后推一天
                displayDate = new Date(firstDay.getTime()+oneDay*index);
                //获取displayDate的农历时间
                CNCalendarDay = CNCalendar.showCal(displayDate).day;
                //判断如果不是当前月的事件，就显示为灰色，如果有当前天就加上背景色
                if(displayDate.getMonth() + 1 !== currentMonth) {
                    td.className = "date notNowMonth"
                } else if(currentYear===new Date().getFullYear() && currentMonth===new Date().getMonth()+1
                    && displayDate.getDate() === new Date().getDate()){
                    td.className = "date nowDay";
                    renderDetail(displayDate);
                } else{
                    td.className = "date";
                }
                //增加节假日显示
                if(vacationArrange.restDaysArr.indexOf(displayDate.getTime()) !== -1) {
                    rest = document.createElement("span");
                    rest.innerHTML = "休";
                    rest.classList.add("restDay");
                    td.classList.add("red");
                    td.classList.remove("notNowMonth");
                    td.appendChild(rest);
                }else if(vacationArrange.workDaysArr.indexOf(displayDate.getTime()) !== -1) {
                    work = document.createElement("span");
                    work.innerHTML = "班";
                    work.classList.add("workDay");
                    td.appendChild(work);
                }
                //确定每个但宇哥要显示的内容
                vacationIndex = vacationArrange.vacationDay[0].indexOf(displayDate.getTime());
                td.innerHTML += displayDate.getDate() + "<br>";
                if(vacationIndex !== -1) {
                    td.innerHTML += vacationArrange.vacationDay[1][vacationIndex];
                } else{
                    td.setAttribute("data-date", displayDate);
                    td.innerHTML += CNCalendarDay;
                }

                index++;
                tr.appendChild(td);
            }
            fragment.appendChild(tr);
        }
        tbody.innerHTML = "";
        tbody.appendChild(fragment);
        //出国当前月，右栏显示每月一日的详细信息
        if(currentMonth != new Date().getMonth()+1) {
            renderDetail(new Date(currentYear+"/"+currentMonth+"/"+1));
        }
    };
    var renderDetail = function(date) {
        rightDate.innerHTML = date.getFullYear() + "-" + (date.getMonth()+1) + "-"
                                + date.getDate() + " 星期" + week[date.getDay()];
        rightDay.innerHTML = date.getDate();
        rightCNDate.innerHTML = CNCalendar.showCal(date).all;
    };

    return {
        render: renderCal,
        renderDetail: renderDetail
    };
});