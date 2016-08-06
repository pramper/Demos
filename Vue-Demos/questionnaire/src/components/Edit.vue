<template>
    <div id="edit">
        <div class="edit-title">
            <input type="text" placeholder="请在这里输入标题" 
                v-model="questionnaire.title" />
        </div>
        <div class="edit-questionnaire">
            <div v-for="(index, item) in questItems">
                <div v-if="item.type !== 'textarea'" class="item">
                    <div class="inputtype-title">
                        <span>Q{{index+1}}&nbsp;&nbsp;{{typeMap[item.type]}}：</span>
                        <span v-text="item.desc"></span>
                    </div>
                    <div class="inputtype-selections">
                        <div v-for="seletion in item.selections" class="selection" track-by="$index">
                            <label>
                                <input :type="item.type" :name="item.name"/>
                                &nbsp;{{seletion}}
                            </label>
                        </div>
                    </div>
                    <div class="item_operate" @click.stop="operateItem($event, item)">
                        <span data-operate="up" v-if="questItems.indexOf(item) !== 0">上移</span>
                        <span data-operate="down"
                            v-if="questItems.indexOf(item) !== questItems.length-1">下移</span>
                        <span data-operate="reuse">复用</span>
                        <span data-operate="delete" >删除</span>
                        <span data-operate="addSelection">增加选项</span>
                    </div>
                </div>
                <div v-else class="item">
                   <div>
                       <span>Q{{index+1}}&nbsp;&nbsp;</span>
                       <span v-text="item.desc"></span>
                   </div>
                   <textarea readonly="readonly"></textarea>
                   <div class="item_operate" @click.stop="operateItem($event, item)">
                        <span data-operate="up" v-if="questItems.indexOf(item) !== 0">上移</span>
                        <span data-operate="down"
                            v-if="questItems.indexOf(item) !== questItems.length-1">下移</span>
                        <span data-operate="reuse">复用</span>
                        <span data-operate="delete">删除</span>
                   </div>
                </div>
            </div>
        </div>
        <div class="edit-form">
                <div class="edit-form-selections" 
                    v-show="flag" 
                    transition="expand" 
                    @click.stop="addItem($event)">
                    <span class="edit-form-selections_radio" data-type="radio">
                        &nbsp;单选</span>
                    <span class="edit-form-selections_checkbox" data-type="checkbox">
                        &nbsp;多选
                    </span>
                    <span class="edit-form-selections_text" data-type="textarea">&nbsp;文本题</span>
                </div>
                <button type="button" @click.stop="flag=!flag">&nbsp;&nbsp;添加问题</button>
        </div>
        <div class="edit-footer">
            <div class="edit-footer_calendar">
                <Calendar v-if="showCalendar" :show-calendar.sync="showCalendar"></Calendar>
                问卷截止日期：
                <input type="text" readonly="readonly" 
                placeholder="截止日期" 
                @click.stop="showCalendar=!showCalendar"
                :value="questionnaire.deadline" />
            </div>
            <div class="edit-footer-buttons">
                <button type="button" @click.stop="update(questionnaire, $event)">更新问卷</button>
                <button type="button" 
                    @click.stop="publish(questionnaire, $event)">发布问卷</button>
            </div>
        </div>
        <p v-if="deadlinePrompt">截止时间必须在今天或今天以后。</p>
        <Mask v-if="showMask" 
            @click.stop="handleClick($event)">
            <div slot="prompt">
                <template v-if="promptType==='addPrompt'">
                    <div class="line">
                        <label>问题描述：</label><input v-model="questItem.desc"/>
                    </div>
                    <div v-if="questItem.type!=='textarea'" class="line">
                        <label>选项：</label><input v-model="questItem.selections"/>
                        <p>不同的选项请以空格隔开。</p>
                    </div>
                </template>
                <template v-if="promptType==='savePrompt'">
                    <div class="line">
                        更新问卷：{{questionnaire.title}}
                    </div>
                </template>
            </div>
        </Mask>
    </div>
</template>
<script>
    import Calendar from './Calendar'
    import Mask from './Mask'
    import VueRouter from 'vue-router'
    import Vue from 'vue'

    Vue.use(VueRouter)
    var router = new VueRouter()

    export default{
        data() {
            return {
                flag: false, // 单选、多选、文本题三个按钮是否显示
                /*questionnaire: {
                    title: '',
                    deadline: '',
                    questItems: [] // 存放问卷中所有的问题，每个问题为数组中的一项
                }, */// 一个问卷调查表的所有数据
                typeMap: {
                    radio: "单选题",
                    checkbox: "多选题"
                },
                showCalendar: false,
                showMask: false,
                deadlinePrompt: false,
                // 内存中还没有插入questItem的一个问题，一旦用户确认后立即插入
                // 拥有type, desc, selections, name四个属性
                questItem: {} ,
                // 不同的值代表提示框中不同的内容；1、addPrompt表示添加新问题
                // 2、savePrompt表示保存问卷时的提示
                // 3、publishPrompt表示发布问卷时的提示
                promptType: ''
            };
        },
        computed: {
            questItems() {
                return this.questionnaire.questItems
            } 
        },
        methods: {
            addItem(event) {
                if(event.target.nodeName.toLowerCase() !== 'span') {
                    return;
                }
                this.questItem.type = event.target.dataset.type // 添加项目的类型
                this.promptType = "addPrompt"
                this.showMask = true
            },
            operateItem(event, item) {
                let operateType = event.target.dataset.operate //四种操作：up, down, reuse, delete
                let itemIndex = this.questItems.indexOf(item)
                let temp = []
                // 上移
                if(operateType === "up") {
                    temp = this.questItems[itemIndex-1]
                    this.questItems.$set(itemIndex-1, item)
                    this.questItems.$set(itemIndex, temp)
                } else if(operateType === "down") {
                    // 下移
                    temp = this.questItems[itemIndex+1]
                    this.questItems.$set(itemIndex+1, item)
                    this.questItems.$set(itemIndex, temp)
                } else if(operateType === "reuse") {
                    // 复用，不能直接把item插入数组questItems中，因为item是一个数组的引用
                    // Object.assign是浅复制，必须重写数组selections
                    let newItem = Object.assign({}, item)
                    newItem.name = new Date().getTime()
                    newItem.selections = []
                    item.selections.forEach((i, index) => {
                        newItem.selections[index] = i
                    })
                    this.questItems.splice(itemIndex+1, 0, newItem)
                } else if(operateType === "delete") {
                    this.questItems.$remove(item)
                } else if(operateType === "addSelection") {
                    item.selections.push("")
                }
            },
            rmSelection(selections, selection) {
                selections.$remove(selection)
            },
            handleClick(event) {
                if(event.target.nodeName.toLowerCase() !== 'button') {
                    return
                }
                let operateType = event.target.dataset.operate
                if(operateType === "confirm") {
                    // 按下确认键
                    this.handleConfirm()
                }else if(operateType === "cancel") {
                    // 按下取消键
                    this.showMask = false
                    this.questItem = {}
                }
            },
            handleConfirm() {
                if(!this.questItem.desc) {
                    // 如果问题描述为空，则返回
                    return
                }
                let desc = this.questItem.desc.trim()
                this.questItem.desc = desc
                if(this.questItem.type !== "textarea") {
                    if(!this.questItem.selections) {
                        // 如果没有填写选项，则返回
                        return
                    }
                    // 如果增加的问题不是textarea类型的
                    let selections = this.questItem.selections.trim()
                    this.questItem.selections = selections.split(/\s+/)
                    this.questItem.name = new Date().getTime()
                }
                this.showMask = false
                this.questItems.push(this.questItem)
                this.questItem = {}
            }
        },
        vuex: {
            getters: {
                questionnaire: state => state.questionnaire
            },
            actions: {
                update: ({dispatch}, item, event) => {
                    if(item.title && item.deadline) {
                        event.target.disabled = true
                        item.state = "未发布"
                        dispatch("UPDATE_QUEST", item) //先保存，在预览
                        dispatch("GET_QUEST", item)
                        router.go({
                            path: '/preview'
                        })
                    }
                },
                publish: ({dispatch}, item, event) => {
                    if(item.title && item.deadline) {
                        let newDate = new Date(new Date().toLocaleDateString()).getTime()
                        let deadlineDate = new Date(item.deadline).getTime()
                        console.log(newDate, deadlineDate)
                        if(deadlineDate < newDate) {
                            // 截止时间必须在今天或今天以前
                            return
                        }
                        event.target.disabled = 'disabled'
                        item.state = "已发布"
                        dispatch("PUBLISH", item) // 先发布，再预览
                        dispatch("GET_QUEST", item)
                        router.go({
                            path: '/preview'
                        })
                    }
                }
            }
        },
        components: {
            Calendar, Mask
        },
        events: {
            "date-change"(date) {
                this.questionnaire.deadline = date.toLocaleDateString()
            }
        }
    }
</script>
<style lang="less">
    @import "../style";
    #edit{
        width: 1000px;
        margin: 40px auto;
        background-color: #fff;
        box-sizing: border-box;
        padding: 20px;
        font-size: 16px;
        .selection_rm{
            visibility: hidden;
            color: red;
            cursor: pointer;
        }
        .selection:hover .selection_rm{
            visibility: visible;
        }
        .edit-footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
        }
        .edit-footer-buttons{
            margin-right: 40px;
            button{
                width: 100px;
                padding: 7px;
                color: #fff;
                border: none;
                background-color: @base;
                border-radius: 3px;
                margin-left: 15px;
            }
        }

        .edit-footer_calendar{
            position: relative;
            margin-left: 40px;
            input{
                padding-left: 10px;
                height: 22px;
                width: 100px;
            }
        }
        #calendar{
            position: absolute;
            left: 0;
            top: -240px;
            background-color: #fff;
        }
        .edit-questionnaire{
            width: 93%;
            margin: 0 auto;
            padding-top: 10px;
        }
        .item:hover{
            background-color: @light;
        }
        .item{
            display: flex;
            flex-direction: column;
            padding: 15px 0;
            input{
                border: none;
                font-size: 16px;
                background-color: transparent;
            }
            textarea, .selection{
                display: block;
                margin-left: 30px;
                margin-top: 15px;
            }
            textarea{
                overflow: hidden;
                resize: none; 
                width: 350px;
                height: 150px;
                background-color: transparent;
            }
        }
        .item_operate{
            visibility: hidden;
        }
        .item:hover .item_operate{
            visibility: visible;
            align-self: flex-end;
            span{
                padding: 3px;
                background-color: #ccc;
                margin-right: 10px;
                border-radius: 2px;
                cursor: pointer;
            }
        }
        .expand-transition{
            transition: all .3s;
            width: 100%;
            height: 50px;
            overflow: hidden;
        }
        .expand-enter, .expand-leave{
            height: 0;
            opacity: 0;
        }
        .edit-form-selections_radio:before{
            content: '\f192';
            font-family: FontAwesome;
        }
        .edit-form-selections_checkbox:before{
            content: '\f14a';
            font-family: FontAwesome;
        }
        .edit-form-selections_text:before{
            content: '\f03a';
            font-family: FontAwesome;
        }
        .edit-form-selections{
            display: flex;
            border-top: 1px solid #ccc;
            justify-content: center;
            align-items: center;
            .edit-form-selections_checkbox{
                margin: 0 30px;
            }
            span{
                background-color: #eee;
                padding: 5px 10px;
                border-radius: 2px;
                cursor: pointer;
            }
            span:hover{
                background-color: @light;
            }
        }
        .edit-title{
            width: 100%;
            border-bottom: 1px solid #ccc;
            input{
                width: 100%;
                height: 70px;
                border: none;
                font-size: 30px;
                text-align: center;
                font-weight: bold;
            }
            input:focus{
                background-color: @light;
            }
        }
        .edit-form{
            width: 100%;
            padding: 10px 0;
            border-bottom: 1px solid #ccc; 
            button{
                display: block;
                width: 90%;
                height: 60px;
                margin: 0 auto;
                border: none;
                cursor: pointer;
                border-radius: 4px;
                background-color: #eee;
                font-size: 22px;
            }
            button:hover{
                background-color: @light;
            }
            button:before{
                content: "\f067";
                font-family: FontAwesome;
            }

        }
    }
    .popup-content{
        .line{
            margin-top: 15px;
            text-align: center;
            label{
                display:inline-block;
                width: 90px;
                text-align: right;
            }
            p{
                font-size: 14px;
                margin-top: 10px;
                margin-left: 100px;
                text-align: left;
                
            }
            p:before{
                content: '* ';
                color: #f00;
            }
            input{
                width: 200px;
                height: 20px;
                padding: 0 4px;
            }
        }
    }
</style>