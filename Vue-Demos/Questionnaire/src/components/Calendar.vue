<template>
    <div id="calendar">
        <div class="calendar-selections">
            <span class="calendar-selections_last"
                @click="decrMonth">
                <i class="fa fa-chevron-left"></i>
            </span>
            <select name="year" class="calendar-selections_year"
                v-model="currentYear">
                <option v-for="year in yearList">{{year}}</option>
            </select>
            <select class="calendar-selections_month"
                v-model="currentMonth">
                <option v-for="month in monthList">{{month}}</option>
            </select>
            <span class="calendar-selelctions_next"
                @click="incrMonth">
                <i class="fa fa-chevron-right"></i>
            </span>
        </div>
        <table @click.stop="handleClick($event)">
            <thead>
                <tr><th v-for="week in weekList">{{week}}</th></tr>
            </thead>
            <tbody>
                <tr v-for="row in tableData">
                    <td v-for="date in row"
                        :class="{'not-current-month': date.getMonth()!==currentMonth-1}"
                        :data-date="date.getTime()">
                        {{date.getDate()}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    var date = new Date()

    export default{
        props: ['showCalendar'],
        data() {
            return {
                weekList: ['日', '一', '二', '三', '四', '五', '六'],
                currentYear: date.getFullYear(),
                currentMonth: date.getMonth() + 1,
            }
        },
        computed: {
            yearList() {
                let yearList = []
                for(let i=1900; i<2051; i++) {
                    yearList.push(i)
                }
                return yearList
            },
            monthList() {
                let monthList = []
                for(let i=1; i<=12; i++) {
                    monthList.push(i)
                }
                return monthList
            },
            tableData() {
                let currentDateList = [] //当前表中所显示的所有日期数据，存储的格式为毫秒数(getTime())
                let date = new Date(this.currentYear, this.currentMonth-1, 1) //当前年月第一天的日期对象
                let oneDayMilliseconds = 24*60*60*1000 // 一天的毫秒数
                let dateWeek = date.getDay() // 当前年月第一天的星期
                let firstDate = date.getTime() - dateWeek*oneDayMilliseconds // 当前表格第一格所显示日期的毫秒数
                //按照6行7列存储时间数据（毫秒）
                for(let i=0; i<6; i++) {
                    currentDateList[i] = []
                    for(let m=0; m<7; m++) {
                        currentDateList[i].push(new Date(firstDate))
                        firstDate += oneDayMilliseconds
                    }
                }
                return currentDateList
            }
        },
        methods: {
            incrMonth() {
                if(this.currentMonth === 12) {
                    this.currentMonth = 1
                    this.currentYear++
                } else{
                    this.currentMonth++
                }
            },
            decrMonth() {
                if(this.currentMonth === 1) {
                    this.currentMonth = 12
                    this.currentYear--
                }else{
                    this.currentMonth--
                }
            },
            handleClick(event) {
                if(event.target.dataset.date) {
                    let date = new Date(parseInt(event.target.dataset.date))
                    this.currentYear = date.getFullYear()
                    this.currentMonth = date.getMonth() + 1
                    // this.currentDate = date
                    this.$dispatch("date-change", date) // 把选中的 日期传给父组件，再通过父组件传给其他子组件
                    this.showCalendar = false
                }
                
            }
        }
    }
</script>
<style lang="less">
    @import "../color";

    #calendar{
        // display: none;
        width: 300px;
        // height: 200px;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-sizing: border-box;
        padding: 10px;
        font-size: 14px;
        user-select: none;
        .calendar-selections{
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: 30px;
            span{
                display: inline-block;
                height: 24px;
                line-height: 24px;
                cursor: pointer;
            }
        }
        .calendar-selections_year, .calendar-selections_month{
            width: 90px;
            height: 24px;
            option{
                text-align: center;
            }
        }
        table{
            width: 100%;
            text-align: center;
            border-collapse: collapse;
        }
        table, th, td{
            border: none;
        }
        tr{
            height: 26px;
        }
        td{
            cursor: pointer;
            transition: background-color .2s;
        }
        td:hover{
            background-color: @light;
        }
        .not-current-month{
            color: #aaa;
        }
    }
</style>