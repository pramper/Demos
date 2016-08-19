<template>
    <div id="app">
        <v-header></v-header>
        <router-view keep-alive></router-view>
    </div>
</template>

<script>
    import Header from './components/Header'
    import Index from './components/Index'
    import store from './vuex/store'

    export default {
        components: {
            'v-header': Header,
            Index
        },
        store
    }
</script>
  
<style lang="less">
    @import './color.less';
    html, body{
    width: 100%;
    height: 100%;
    font-family:  Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif,  fontawesome;
    }
    html, body, div, h1, h2, h3, p, button{
    padding: 0;
    margin: 0;
    line-height: 1;
    }
    html{
        font-size: 100px;
        min-width: 980px;
    }
    button{
        cursor: pointer;
        outline: none;
        border: none;
        font-size: .16rem;
    }
    input, textarea{
        outline: none;
    }
    a{
        text-decoration: none;
    }
    li{
        list-style: none;
    }
    .checkbox, .radio{
        display: none;
    }
    .checkbox + label, .radio + label{
        position: relative;
        font-size: 16px;
        padding-left: 23px;  /* label和选框之间的间隔 */
        cursor: pointer;
        -webkit-user-select: none; /* 禁止label中的文字双击时被选中 */
        -moz-user-select: none;
        -ms-user-select: none;
    }
    .checkbox + label::before, .radio + label::before{
        position: absolute;
        content: "";
        top: 48%;
        margin-top: -8px;
        left: 0;
        width: 16px;
        height: 16px;
        border: 1px solid #c0c0c0;
        background-color: #fff;
    }
    .checkbox + label::before{
        border-radius: 3px;
    }
    .radio + label::before{
        border-radius: 50%;
    }
    .checkbox:checked + label::after{
        position: absolute;
        content: "";
        width: 5px;
        height: 10px;
        top: 48%;
        margin-top: -7px;
        left: 6px;
        transform: rotate(45deg);   /*对号由长方形的两个边框旋转90°构成*/
        border-bottom: 2px solid #fff;
        border-right: 2px solid #fff;
    }
    .checkbox:checked + label::before{
        background-color: #3e97eb;
        border: 1px solid #3e97eb;
    }
    .radio:checked + label::before{
        border: 1px solid #3e97eb;
    }
    .radio:checked + label::after{
        position: absolute;
        content: "";
        width: 6px;   /* radio中心原点的大小 */
        height: 6px;
        top: 50%;
        margin-top: -3px;
        left: 6px;
        border-radius: 50%;
        background-color: #3e97eb;
    }
    

    #create{
        width: 10rem;
        border: .03rem solid #ccc;
        border-radius: .05rem;
        margin: .4rem auto;
        font-size: .16rem;
        box-sizing: border-box;
        padding: .1rem .2rem;
        .item-operation{
            display: flex;
            justify-content: flex-end;
            button{
                width: .4rem;
                padding: .05rem 0;
                margin-right: .1rem;
                border-radius: .02rem;
            }
        }
        .questItem:hover{
            background-color: @light;
        }
        .deadline{
            position: relative;
        }
        #calendar{
            position: absolute;
            top: -240px;
            left: 0;
            background-color: #fff;
        }
        .deadline{
            input{
                width: 1.5rem;
                padding-left: .1rem;
                height: .25rem;
                border-radius: .02rem;
                border: 1px solid #ccc;
            }
        }
        .submit{
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: .2rem;
            button{
                width: .9rem;
                background-color: @base;
                margin-right: .2rem;
                padding: .1rem 0;
                color: #fff;
                border-radius: .03rem;
            }
            button:hover{
                background-color: @light;
                color: #555;
            }
        }
        .questItem{
            padding: .15rem .2rem;
            font-size: .17rem;
            transition: background-color .1s;
            textarea{
                resize: none;
                width: 3.3rem;
                height: 1.7rem;
                border-radius: .03rem;
            }
        }
        .questItem-title{
            margin-bottom: .15rem;
        }
        .questItem-title + div{
            margin-left: .2rem;
        }
        .selection{
            margin-bottom: .15rem;
        }
        .mask-prompt{
            display: flex;
            flex-direction: column;

            position: absolute;
            width: 4rem;
            height: 2rem;
            top: 40%;
            left: 50%;
            margin-left: -2rem;
            margin-top: -1rem;
        }
        .prompt{
            font-size: .12px;
            text-align: center;
            margin-top: .1rem;
        }
        .prompt-header{
            width: 100%;
            background-color: @base;
            height: .3rem;
            text-align: center;
            line-height: .3rem;
            color: #fff;
            font-weight: bold;
            font-size: .18rem;
        }
        .prompt-body{
            background-color: #fff;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0 .5rem;
            label{
                display: inline-block;
                width: .85rem;
                text-align: right;
            }
        }
        .prompt-footer{
            height: .3rem;
            background-color: #fff;
            display: flex;
            justify-content: space-around;
            align-item: center;
            padding: .1rem .5rem;
            button{
                background-color: @base;
                text-align: center;
                width: .7rem;
                color: #fff;
                border-radius: .03rem;
            }
        }
        .mask{
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, .15);
            z-index: 10;
        }
        .expand-transition{
            transition: all .3s;
            width: 100%;
            height: .3rem;
            overflow: hidden;
        }
        .expand-enter, .expand-leave{
            height: 0;
            opacity: 0;
        }
        .quest{
            border-bottom: 2px solid #ccc;
        }
        .quest-title_input{
            width: 100%;
            height: .3rem;
            border: none;
            font-size: .25rem;
            text-align: center;
            font-weight: bold;
            letter-spacing: .05rem;
        }
        .quest-title{
            border-bottom: .02rem solid #ccc;
            padding-bottom: .1rem;
        }
        .add{
            width: 95%;
            margin: .1rem auto;
            border: .01px solid #ccc;
            padding: .1rem 0;
        }
        .add-button{
            margin-top: .1rem;
            button{
                display: block;
                width: 100%;
                 background-color: #ddd;
                border-radius: 3px;
                padding: .2rem 0;
                color: #444;
                font-size: .23rem;
                transition: background-color .1s;
            }
            button:hover{
                background-color: #efefef;
            }

        }
        .add-items{
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                background-color: #ddd;
                color: #444;
                cursor: pointer;
                width: .85rem;
                text-align: center;
                padding: .05rem 0;
                border-radius: .02rem;
            }
            span:hover{
                background-color: #efefef;
            }
        }
        .middle{
            margin: 0 .4rem;
        }
    }
</style>
