<template>
    <div id="create" v-if="!$loadingRouteData">
        <div class="quest">
            <div class="quest-title">
                <h2 v-text="questionnaire.title" class="quest-title_preview"></h2>
            </div>
            <div v-for="questItem in questionnaire.questItemList" class="questItem-data" track-by="$index">
                <!-- <div>
                    <p class="questItem-title">
                        <span>{{$index+1}}、{{typeMap[questItem.type]}}：</span>
                        <span v-text="questItem.title"></span>
                    </p>
                    <div v-if="questItem.type==='textarea'">
                        <textarea></textarea>
                    </div>
                    <div v-else>
                        <div v-for="selection in questItem.selections" class="selection">
                            <input :type="questItem.type" :name="questItem.name" 
                                :id="questItem.name+$index"
                                :class="questItem.type"/>
                            <label v-text="selection" :for="questItem.name+$index"></label>
                        </div>
                    </div>
                </div> -->
                <div class="chart" v-echarts="questItem"></div>

            </div>
        </div>
        <p class="preview-deadline">问卷截止日期：{{new Date(questionnaire.deadline).toLocaleDateString()}}</p>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import Vue from 'vue'

    export default{
        data() {
            return {
                typeMap: {
                    radio: '单选',
                    checkbox: '多选',
                    textarea: '问答'
                }
            }
        },
        vuex: {
            getters: {
                questionnaire: state => state.currentQuestionnaire,
                questionnaireList: state => state.questionnaireList
            },
            actions: {
                setCurrentQuest({dispatch}, item) {
                    dispatch("SET_QUEST", item)
                }
            }
        },
        route: {
            data({to, next}) {
                let id = to.params.questId
                if(!this.questionnaire) {
                    this.questionnaireList.forEach(item => {
                        if(parseInt(item.id) === parseInt(id)) {
                            this.setCurrentQuest(item)
                            return
                        }
                    })
                }
                // 渲染图表
                next()
            }
        },
        directives: {
            'echarts': {
                bind: function() {
                    let self = this
                    Vue.nextTick(function() {
                        self.instance = echarts.init(self.el)
                    })
                },
                update: function(newVal, oldVal) {
                    let self = this
                    let seriesData = []
                    let option = {}
                    // 如果不是文本类问题，则画柱状图；否则话饼图
                    if(newVal.type !== 'textarea') {
                        newVal.selections.forEach(item => {
                            seriesData.push(parseInt(Math.random()*100))
                        })
                        option = {
                            grid: {
                                top: 40,
                                bottom: 25
                            },
                            title: {
                                text: self.vm.typeMap[newVal.type] + '.' +  newVal.title,
                                textAlign: "left"
                            },
                            yAxis: {

                            },
                            xAxis: {
                                data: newVal.selections
                            },
                            series:[{
                                type: 'bar',
                                data: seriesData
                            }]
                        }
                    } else {
                        seriesData.push(parseInt(Math.random()*100))
                        seriesData.push(100 - seriesData[0])
                        option = {
                            title: {
                                text: self.vm.typeMap[newVal.type] + '.' +  newVal.title,
                                textAlign: "left"
                            },
                            series : [{
                                type: 'pie',
                                radius: "60%",
                                data: [
                                    {name: '有效回答', value: seriesData[0]},
                                    {name: '无效回答', value: seriesData[1]}
                                ]
                            }]
                        }
                    }
                    Vue.nextTick(function() {
                        self.instance.setOption(option)
                    })
                    
                },
                unbind: function() {
                    this.instance.dispose()
                }
            }
        }
    }
</script>
<style lang="less">
    #create{
        .preview-deadline{
            font-size: .14rem;
            margin-top: .2rem;
            text-align: center;
        }
        .quest-title_preview{
            text-align: center;
            letter-spacing: .05rem;
            font-size: .28rem;
            font-weight: bold;
        }
         .questItem-data{
            margin: .1rem 0;
            border: 1px solid #ccc;
            border-radius: .03rem;
        } 
        .chart{
            min-height: 2rem;
            width: 4rem;
            margin: 0 auto;
        }
    }
</style>

