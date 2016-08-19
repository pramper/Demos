<template>
    <div id="create" v-if="!$loadingRouteData">
        <div class="quest">
            <div class="quest-title">
                <input type="text" class="quest-title_input" placeholder="请输入问卷的标题"
                    v-model="questionnaire.title" />
            </div>
            <div v-for="questItem in questionnaire.questItemList" class="questItem" track-by="$index">
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
                <div class="item-operation" @click="handleItemOperation($event, questItem)">
                    <button type="button" v-if="$index != 0" data-operation="up">上移</button>
                    <button type="button" v-if="$index != questionnaire.questItemList.length-1"
                        data-operation="down">下移</button>
                    <button type="button" data-operation="remove">删除</button>
                    <button type="button" data-operation="reuse">复用</button>
                </div>
            </div>
            <div class="add">
                <div class="add-items" 
                    v-show="showSelections"
                    transition="expand"
                    @click.stop="addItem($event)">
                    <span data-type="radio">单选题</span>
                    <span class="middle" data-type="checkbox">多选题</span>
                    <span data-type="textarea">文本题</span>
                </div>
                <div class="add-button">
                    <button type="button" @click.stop="showSelections=!showSelections">添加问题</button>
                </div>
            </div>
        </div>
        <div class="mask" v-if="showMask">
            <div class="mask-prompt">
                <div class="prompt-header">请输入详细信息</div>
                <div class="prompt-body">
                    <div>
                        <label>问题名称：</label>
                        <input type="text" placeholder="请输入标题" v-el:item-title />
                    </div>
                    <div>
                        <label>选项：</label>
                        <input type="text" placeholder="请输入选项" v-el:item-selections 
                            :disabled="questItem.type === 'textarea'" />
                        <p class="prompt">*&nbsp;不同选项之间请以空格隔开</p>
                    </div>
                </div>
                <div class="prompt-footer" @click.stop="handleInput($event)">
                    <button type="button" data-operation="confirm">确定</button>
                    <button type="button" data-operation="cancel">取消</button>
                </div>
            </div>
        </div>
        <div class="submit">
            <div class="deadline">
                <label>问卷截止日期：</label>
                <input type="text" placeholder="点击选择问卷截止日期" readonly 
                    v-el:deadline
                    :value="new Date(questionnaire.deadline).toLocaleDateString()"
                    @click.stop="showCalendar=!showCalendar"/>
                <Calendar :show-calendar.sync="showCalendar" v-if="showCalendar"></Calendar>
            </div>
            <div @click="submit($event)">
                <button type="button" data-operation="save">保存问卷</button>
                <button type="button" data-operation="publish">发布问卷</button>
            </div>
        </div>
    </div>
</template>
<script>
    import Calendar from './Calendar'

    export default{
        data() {
            return {
                showSelections: false,
                showMask: false,
                showCalendar: false,
                questItem: {},
                typeMap: {
                    radio: '单选',
                    checkbox: '多选',
                    textarea: '问答'
                }
            }
        },
        methods: {
            // 添加问题的类型
            addItem(event) {
                let target = event.target
                if(target.nodeName.toLowerCase() === 'span') {
                    this.showMask = true    // 显示弹出框
                    this.questItem.type = target.dataset.type   // 设置问题的类型
                }
            },
            // 处理弹出框中的点击事件
            handleInput(event) {
                let target = event.target
                if(target.nodeName.toLowerCase() !== 'button') {
                    return
                }
                let itemTitle = this.$els.itemTitle
                let itemSelections = this.$els.itemSelections
                if(target.dataset.operation === "confirm") {
                    if(this.questItem.type === "textarea") {
                        this.addTextarea(itemTitle)
                    } else {
                        this.addSelections(itemTitle, itemSelections)
                    }
                } else {
                    this.handleCancel()
                }
            },
            // 添加文本问题
            addTextarea(itemTitle) {
                if(itemTitle.value.trim() === '') {
                    return
                }
                this.questItem.title = itemTitle.value.trim()
                this.questionnaire.questItemList.push(this.questItem)
                this.handleCancel()
            },
            // 添加选项问题
            addSelections(itemTitle, itemSelections) {
                if(itemTitle.value.trim() === '' || itemSelections.value.trim() === '') {
                    return
                }
                this.questItem.title = itemTitle.value.trim()
                this.questItem.selections = itemSelections.value.trim().split(/\s+/)
                this.questItem.name = Date.now()
                this.questionnaire.questItemList.push(this.questItem)
                this.handleCancel()
            },
            // 处理取消事件
            handleCancel() {
                this.$els.itemTitle.value = ''
                this.$els.itemSelections.value = ''
                this.questItem = {}
                this.showMask = false
            },
            // 处理上移、下移、删除和复用操作
            handleItemOperation(event, questItem) {
                let operation = event.target.dataset.operation
                switch(operation) {
                    case 'up':
                        this.moveUp(questItem)
                        break
                    case 'down':
                        this.moveDown(questItem)
                        break
                    case 'remove':
                        this.removeQuestItem(questItem)
                        break
                    case 'reuse':
                        this.reuseQuestItem(questItem)
                        break
                    default: 
                        throw new Error("该操作" + "operation" + "不存在！")
                }
            },
            // 上移
            moveUp(questItem) {
                let index = this.questionnaire.questItemList.indexOf(questItem)
                this.questionnaire.questItemList.$remove(questItem)
                this.questionnaire.questItemList.splice(index-1, 0, questItem)
            },
            // 下移，其实就是把后边那个上移
            moveDown(questItem) {
                let index = this.questionnaire.questItemList.indexOf(questItem)
                this.moveUp(this.questionnaire.questItemList[index+1])
            },
            // 删除
            removeQuestItem(questItem) {
                this.questionnaire.questItemList.$remove(questItem)
            },
            // 复用
            reuseQuestItem(questItem) {
                let index = this.questionnaire.questItemList.indexOf(questItem)
                // 为了完整的克隆一个对象，先把对象转换成JSON，再转换成对象
                let newQuestItem = JSON.parse(JSON.stringify(questItem))
                if(newQuestItem.type !== 'textarea') {
                    newQuestItem.name = Date.now()
                }
                this.questionnaire.questItemList.splice(index+1, 0, newQuestItem)
            },
            // 处理提交
            submit(event) {
                let operation = event.target.dataset.operation
                let oneDayTime = 24*60*60*1000
                if(this.questionnaire.title.trim() === '') {
                    alert("问卷的标题不能为空！")
                    return
                }
                if(this.questionnaire.questItemList.length === 0) {
                    alert("请至少设置一个问题！")
                    return
                }
                if(!this.questionnaire.deadline || this.questionnaire.deadline<Date.now()) {
                    alert("问卷的截止时间必须在今天之后！")
                    return
                }
                if(operation === 'save') {
                    this.save()
                } else {
                    this.publish()
                }
            }
        },
        components: {
            Calendar
        },
        events: {
            'date-change': function(msg) {
                let date = new Date(msg)
                this.$els.deadline.value = date.toLocaleDateString()
                this.questionnaire.deadline = date.getTime()
            }
        },
        vuex: {
            actions: {
                save({dispatch}) {
                    this.questionnaire.state = "未发布"
                    dispatch('UPDATE_QUEST', this.questionnaire)
                    this.$router.go(`/preview/${this.questionnaire.id}`)
                },
                publish({dispatch}) {
                    this.questionnaire.state = "已发布"
                    dispatch('UPDATE_QUEST', this.questionnaire)
                    this.$router.go(`/preview/${this.questionnaire.id}`)
                },
                setCurrentQuest({dispatch}, item) {
                    dispatch("SET_QUEST", item)
                }
            },
            getters: {
                questionnaire: state => state.currentQuestionnaire,
                questionnaireList: state => state.questionnaireList
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
                next()
            }
        }
    }
</script>