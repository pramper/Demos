<template>
    <div id="create" v-if="!$loadingRouteData">
        <div class="quest">
            <div class="quest-title">
                <h2 v-text="questionnaire.title" class="quest-title_preview"></h2>
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
            </div>
        </div>
        <p class="preview-deadline">问卷截止日期：{{new Date(questionnaire.deadline).toLocaleDateString()}}</p>
    </div>
</template>
<script>
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
                next()
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
    }
</style>

