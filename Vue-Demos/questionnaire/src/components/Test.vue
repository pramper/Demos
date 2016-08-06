<template>
    <div id="test">
        <div class="date-input" @click.stop="isShow=!isShow">
            <span><i class="fa fa-calendar"></i></span>
            <input type="text" 
                readonly="readonly" 
                v-model="date" 
                placeholder="请选择日期" />
        </div>
        <Calendar v-if="isShow"></Calendar>
    </div>
</template>
<script>
    import Calendar from './Calendar'

    export default{
        data() {
            return {
                date: "",
                isShow: false
            }
        },
        components: {
            Calendar
        },
        events: {
            'date-change': function(date) {
                this.date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            }
        }
    }
</script>
<style lang="less">
    #test{

    }
    #calendar{
        position: absolute;
    }
</style>