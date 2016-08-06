<template>
    <div id="home">
        <div class="home-empty" v-if="!hasQuest">
            <button class="home-empty_create" type="button" v-link="'create'">
                <i class="fa fa-plus"></i>&nbsp;&nbsp;新建问卷
            </button>
        </div>
        <div class="home-questlist" v-else>
            <table class="questlist">
                <thead>
                    <tr><th v-for="header in thHeaders" v-text="header"></th></tr>
                </thead>
                <tbody>
                    <tr v-for="(index, item) in questionnaireList" class="questlist-item">
                        <td><input type="checkbox" name="questionnaire" @click='checkOne(item)'/>
                            &nbsp;{{item.title}}
                        </td>
                        <td v-text="item.deadline"></td>
                        <td v-text="item.state"></td>
                        <td @click.stop="operateQuest($event, item)" class="buttons">
                            <button type="button" data-operate="edit" 
                                v-if="item.state==='未发布'"
                                v-link="'edit'">编辑
                            </button>
                            <button type="button" data-operate="data"
                                v-else>查看数据
                            </button>
                            <!-- <button type="button" data-operate="delete">删除</button> -->
                            <button type="button" data-operate="check" v-link="'preview'">问卷预览</button>

                        </td>
                    </tr>
                    <tr class="last-tr">
                        <td>
                            <button type="button" class="questlist_rmall" @click.stop="remove">删除</button>
                        </td>
                        <td colspan="3">
                            <button type="button" v-link="'create'" class="questlist_create">新建问卷</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Mask v-show="showMask" @click.stop="handleMaskClick($event)">
            <div slot="prompt">
                确定删除？
            </div>
        </Mask>
    </div>
</template>
<script>
    import Mask from './Mask'

    
    export default{
        data() {
            return {
                hasQuest: this.questionnaireList.length > 0,
                thHeaders: ['标题', '截止时间', '状态', '操作'],
                showMask: false,
                checked: true,
                rmList: [] // 要删除的问卷队列
            };
        },
        computed: {
            checkboxState() {
                let arr = []
                this.questionnaireList.forEach((item, index) => {
                    arr[index] = false
                })
                return arr
            }
        },
        methods: {
            operateQuest(event, item) {
                if(event.target.nodeName.toLowerCase() !== "button") {
                    return;
                }
                let operation = event.target.dataset.operate
                if(operation === "edit" || operation === "check") {
                    this.setQuest(item)
                }
            },
            handleMaskClick(event) {
                if(event.target.nodeName.toLowerCase() !== 'button') {
                    return
                }
                let operateType = event.target.dataset.operate
                if(operateType === "confirm") {
                   this.rmList.forEach(item => {
                       this.deleteOne(item)
                   })
                   this.rmList = []
                   this.showMask = false
                } else if(operateType === "cancel") {
                    this.rmQuest = ''
                    this.showMask = false
                }

            },
            checkedAll() {
                console.log(1)
                this.checkboxState.forEach(item => item=true)
            },
            checkOne(item) {
                if(this.rmList.indexOf(item) === -1) {
                    this.rmList.push(item)
                }else{
                    this.rmList.$remove(item)
                }
            },
            remove() {
                if(this.rmList.length < 1) {
                    return
                }
                this.showMask = true
                
            }
        },
        vuex: {
            actions:{
                setQuest: ({dispatch}, item) => dispatch('GET_QUEST', item),    
                deleteOne: ({dispatch}, item) => dispatch('DELETE_ONE', item)
            },
            getters: {
                questionnaireList: state => state.questionnaireList
            }
        },
        components: {
            Mask
        }
    }
</script>
<style lang="less">
    @import "../style";

    #home{
        display: flex;
        width: 800px;
        // height: 300px;
        margin: 40px auto;
        border-radius: 5px;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        .questlist_create, .questlist_rmall{
            background-color: @base;
            border: none;
            color: #fff;
            width: 100px;
            height: 30px;
            border-radius: 2px;
        }
        
        .questlist-item:hover{
            background-color: @light;
        }
        .home-empty_create{
            width: 200px;
            height: 40px;
            background-color: @base;
            font-size: 20px;
            border: none;
            color: #fff;
            text-align: center;
            cursor: pointer;
            border-radius: 3px;
        }
        .home-questlist{
            width: 100%;
            padding: 10px 0;
        }
        .buttons{
            button{
                font-size: 16px;
                background-color: @base;
                border: none;
                border-radius: 2px;
                padding: 3px 5px;
                color: #fff;
            }
        }
        .questlist{
            width: 90%;
            margin: 0 auto;
            border-collapse: collapse;
            .last-tr td{
                border: none;
                padding-top: 20px;
            }
            th{
                height: 50px;
                font-size: 18px;
                font-weight: bold;
            }
            td{
                font-size: 16px;
                height: 40px;
                border-bottom: 1px solid #ccc;
            }
            td+td{
                text-align: center;
            }
        }
    }
</style>