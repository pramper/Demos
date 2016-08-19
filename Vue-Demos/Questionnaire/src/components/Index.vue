<template>
    <div id="index">
        <div class="empty" v-if="questionnaireList.length === 0">
            <button type="button" @click.stop="createQuest">新建问卷</button>
        </div>
        <div class="full" v-else>
            <table>
                <thead>
                    <tr>
                        <th></th><th>标题</th><th>截止时间</th><th>状态</th><th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="questionnaire in questionnaireList" class="quest"
                        @click="handleOperation($event, questionnaire)">
                        <td class="col01">
                            <input type="checkbox" :name="name" :id="name+$index" class="checkbox"/>
                            <label :for="name+$index" data-operation="checked"></label>
                        </td>
                        <td class="col02">
                            <span v-text="questionnaire.title"></span>
                        </td>
                        <td v-text="new Date(questionnaire.deadline).toLocaleDateString()"></td>
                        <td v-text="questionnaire.state"></td>
                        <td v-if="questionnaire.state==='未发布'" >
                            <button data-operation="preview">预览问卷</button>&nbsp;&nbsp;&nbsp;
                            <button data-operation="edit">编辑问卷</button>
                        </td>
                        <td v-else>
                            <button data-operation="preview">预览问卷</button>&nbsp;&nbsp;&nbsp;
                            <button data-operation="data">数据统计</button>
                        </td>
                    </tr>
                    <tr class="last-row" @click="createOrRm($event)">
                        <td colspan="2" class="left">
                            <!-- <input type="checkbox" id="check-all" class="checkbox" />
                            <label for="check-all" data-operation="checkAll" data-checked="false">全选</label> -->
                            <button type="button" data-operation="rmChecked">删除</button>
                        </td>
                        <td colspan="3" class="center">
                            <button type="button" data-operation="create">新建问卷</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: Date.now(),   // 用于标记checkbox
                checkedQuest: []    // 被选中的问卷列表
            };
        },
        vuex: {
            getters: {
                questionnaireList: state => state.questionnaireList
            },
            actions: {
                setQuest({dispatch}, item) {
                    dispatch('SET_QUEST', item)
                },
                removeQuest({dispatch}, item) {
                    dispatch('RM_QUEST', item)
                }
            }
        },
        methods: {
            createQuest() {
                this.$router.go('/create')
            },
            // 处理每个问卷后面的两个按钮，以及选中按钮
            handleOperation(event, questionnaire) {
                let operation = event.target.dataset.operation
                if(operation === "edit") {
                    this.setQuest(questionnaire)
                    this.$router.go(`/edit/${questionnaire.id}`)
                } else if(operation === "preview") {
                    this.setQuest(questionnaire) 
                    this.$router.go(`/preview/${questionnaire.id}`)
                } else if(operation === "checked") {
                    this.handleChecked(questionnaire)
                } else if(operation === "data") {
                    this.setQuest(questionnaire)
                    this.$router.go(`/data/${questionnaire.id}`)
                }
            },
            // 处理每个问卷的checked事件
            handleChecked(questionnaire) {
                let index = this.checkedQuest.indexOf(questionnaire)
                // 每次点击checkbox，如果该问卷在选中的问卷列表中则在列表中删除该问卷
                // 如果不在列表中，则添加该问卷到列表
                if(index === -1) {
                    this.checkedQuest.push(questionnaire)
                } else {
                    this.checkedQuest.splice(index, 1)
                }
            },
            // 处理新建、删除按钮和全选
            createOrRm(event) {
                let operation = event.target.dataset.operation
                if(operation === 'create') {
                    this.createQuest()
                } else if (operation === 'rmChecked') {
                    this.remove()
                }
            },
            // 删除问卷
            remove() {
                while(this.checkedQuest.length > 0) {
                    let questionnaire = this.checkedQuest.shift()
                    this.removeQuest(questionnaire)
                }
            }
        }
    }
</script>
<style lang="less">
    @import '../color.less';

    #index{
        width: 100%;
        .col01{
            width: 5%;
            text-align: left;
        }
        .col02{
            width: 30%;
        }
        .buttons{
            display: flex;
            justify-content: space-around;
        }
        .quest{
            td{
                padding: .15rem 0;
                border-bottom: 1px solid #cdcdcd;
            }
        }
        .quest:hover{
            background-color: @light;
        }
        .last-row{
            td{
                padding: .2rem 0;
            }
            button{
                margin-left: .2rem;
            }
        }
        .center{
            text-align: center
        }
        .left{
            text-align: left;
        }
        .full{
            width: 10rem;
            margin: .2rem auto;
            border: .02rem solid #ccc;
            border-radius: .04rem;
            table{
                border-collapse: collapse;
                width: 90%;
                margin: 0 auto;
                text-align: center;
            }
            thead{
                font-size: .18rem;
            }
            tbody{
                font-size: .17rem;
                
            }
            th{
                padding: .2rem 0;
            }
            
            button{
                background-color: #fff;
                border: 1px solid #ccc;
                border-radius: .02rem;
                width: .9rem;
                text-align: center;
                padding: .05rem 0;
            }
            button:hover{
                background-color: @light;
            }
        }
        .empty{
            width: 6rem;
            height: 3rem;
            margin: 0.4rem auto;
            border: 0.03rem solid #ccc;
            font-size: 0.2rem;
            border-radius: .08rem;
            display: flex;
            justify-content: center;
            align-items: center;
            button{
                font-size: 0.2rem;
                background-color: @base;
                border: none;
                border-radius: 0.04rem;
                color: #fff;
                width: 2rem;
                text-align: center;
                padding: 0.1rem 0;
            }
            button:hover{
                background-color: @light;
            }
        }
    }
</style>