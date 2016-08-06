<template>
    <div id="preview">
        <h2 v-text="questionnaire.title" class="quest-title"></h2>
        <div v-for="(index, item) in questionnaire.questItems" class="quest-item">
            <div v-if="item.type==='radio'||item.type==='checkbox'">
                <p><span>Q{{index+1}}&nbsp;</span>{{typeMap[item.type]}}：{{item.desc}}</p>
                <label v-for="selection in item.selections">
                    <input :type="item.type" :name="item.name" />&nbsp;&nbsp;{{selection}}
                </label>
            </div>
            <div v-else>
                <p><span>Q{{index+1}}&nbsp;</span>{{item.desc}}</p>
                <textarea v-else></textarea>
            </div>
        </div>
        <p class="deadline">截止时间：{{questionnaire.deadline}}</p>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                typeMap: {
                    radio: "单选题",
                    checkbox: "多选题"
                }
            }
        },
        vuex: {
            getters: {
                questionnaire: state => state.questionnaire
            }
        }
    }
</script>
<style lang="less">
    #preview{
        width: 1000px;
        margin: 40px auto;
        background-color: #fff;
        box-sizing: border-box;
        padding: 20px;
        font-size: 16px;
        .deadline{
            text-align: center;
            font-size: 14px;
        }
        .quest-title{
            font-size: 30px;
            font-weight: bold;
            text-align: center;
            border-bottom: 1px solid #ccc;
            height: 70px;
            line-height: 70px;
        }
        .quest-item{
            width: 93%;
            margin: 20px auto;
            label, textarea{
                margin-top: 20px;
                margin-left: 20px;
                display: block;
            }
            textarea{
                overflow: hidden;
                resize: none; 
                width: 350px;
                height: 150px;
            }
        }
    }
</style>