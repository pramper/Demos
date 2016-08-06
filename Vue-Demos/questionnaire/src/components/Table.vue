<template>
    <div id="sort-table">
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        <div id="div">sdfsdfsdfsdfsd</div>
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        站位<br />
        <table v-el:table>
            <thead>
                <tr>
                    <th v-for='colm in colms' @click="sort(colm)">{{map[colm]}} &nbsp;<i class="fa fa-sort"></i></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items | orderBy sortKey sortOrders[sortKey]" track-by="$index">
                    <td v-for="value in item">{{value}}</td>
                </tr>
            </tbody>
        </table>
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
        占位<br />
    </div>
</template>
<script>

    export default{
        data() {
            let items = [
                {
                    name: '小明',
                    chinese: 80,
                    math: 90,
                    english: '70',
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小亮',
                    chinese: 60,
                    math: 100,
                    english: 70,
                    sum: 230
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                },
                {
                    name: '小红',
                    chinese: 90,
                    math: 60,
                    english: 90,
                    sum: 240
                } 
            ]
            let colms = ['name', 'chinese', 'math', 'english', 'sum']
            let map = {
                name: "姓名",
                chinese: '语文',
                math: '数学',
                english: '英语',
                sum: '总计'
            }
            let sortOrders = {}

            colms.forEach(item => sortOrders[item] = 1)
            
            return {
                sortKey: '',
                sortOrders: sortOrders,
                colms: colms,
                map: map,
                items: items                
            }
        },
        methods: {
            sort(key) {
                this.sortKey = key
                this.sortOrders[key] *= -1
            }
        }
    }
</script>
<style lang="less">
    #sort-table{
        font-size: 16px;
        table{
            border-collapse: collapse;
        }
        td, th{
            border: 1px solid #ccc;
            text-align: center;
        }
        th{
            background-color: #888;
            color: #fff;
            height: 30px;
            width: 100px;
            cursor: pointer;
        }
        td{
            height: 40px;
            width: 100px;
        }
    }
</style>