<template>
    <div id="surface" @drop.prevent="drop" @dragover.prevent="dragover" @dragenter.prevent="dragenter">
        <div class="popup" draggable="true" @dragstart="dragstart($event)" @dragend="dragend($event)" 
            v-el:popup>
            <div class="popup-header" >提示</div>
            <div class="popup-content">
                <slot name="prompt"></slot>    
            </div>
            <div class="popup-footer">
                <button type="button" class="popup-button_ok" data-operate="confirm">确定</button>
                <button type="button" class="popup-button_cancle" data-operate="cancel">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ['showMask'],
        data() {
            return {
                innerX: 0,
                innerY: 0
            }
        },
        methods: {
            dragstart(event) {
                this.innerX = event.clientX - parseInt(this.popupCSS.left)
                this.innerY = event.clientY - parseInt(this.popupCSS.top)
            },
            dragend: function(event) {
                this.popup.style.left = event.clientX - this.innerX + 'px'
                this.popup.style.top = event.clientY - this.innerY + 'px'
            },
            dragover() {
                console.log(this.arg)
            },
            dragenter() {},
            drop() {}
        },
        computed: {
            popup: function() {
                return this.$els.popup
            },
            popupCSS: function() {
                return document.defaultView.getComputedStyle(this.popup, null)
            }
        }
    }
</script>
<style lang="less">
    #surface{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        font-size: 16px;
        .popup{
            position: absolute;
            overflow: hidden;
            top: 50%;
            left: 50%;
            margin-top: -200px;
            margin-left: -200px;
            width: 400px;
            height: 200px;
            border-radius: 5px;
        }
        .popup-header{
            height: 30px;
            background-color: #ee7419;
            color: #fff;
            line-height: 30px;
            text-align: center;
        }
        .popup-content{
            height: 130px;
            background-color: #fff;
            box-sizing: border-box;
            padding: 10px;
        }
        .popup-footer{
            text-align: center;
            height: 40px;
            background-color: #fff;
            button{
                border: none;
                border-radius: 2px;
                padding: 0 10px;
                cursor: pointer;
                height: 30px;
                background-color: #ee7419;
                color: #fff;
            }
        }
        .popup-button_ok{
            margin-right: 30px;
        }
        .popup-button_cancle{
            margin-left: 30px;
        }
    }
</style>