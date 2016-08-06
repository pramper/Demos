define(function() {
    //var rest = ["2016/1/1", "2016/1/3", "2016/2/7", "2016/2/8"]
    var restDays = {
        "元旦": ["2016/1/1", 3],
        "除夕": ["2016/2/7", 1],
        "春节": ["2016/2/8", 7],
        "清明节": ["2016/4/2", 3],
        "劳动节": ["2016/4/30", 3],
        "端午节": ["2016/6/9", 3],
        "中秋节": ["2016/9/15", 3],
        "国庆节": ["2016/10/1", 7]
    };
    var vacationDay = [];
    vacationDay[0] = [];
    vacationDay[1] = [];

    var workDaysArr = ["2016/2/6", "2016/2/14", "2016/6/12", "2016/9/18", "2016/10/8", "2016/10/9"];

    var restDaysArr = [],
        oneDay = 1000*60*60*24,
        firstDay;
   for(var i in restDays) {
       if(restDays.hasOwnProperty(i)) {
           firstDay = new Date(restDays[i][0]).getTime();
           for(var j=0; j<restDays[i][1]; j++) {
               restDaysArr.push(new Date(firstDay + oneDay*j).getTime());
           }
       }
   }

    workDaysArr = workDaysArr.map(function(item) {
        return new Date(item).getTime();
    });

    for(var day in restDays) {
        vacationDay[0].push(new Date(restDays[day][0]).getTime());
        vacationDay[1].push(day);
    }
    return {
        restDaysArr: restDaysArr,
        workDaysArr: workDaysArr,
        vacationDay: vacationDay,
        restDays: restDays
    };
});