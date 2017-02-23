<template>
    <div pn-name="root">
        <header @click="hasClosed">
            <div>
                <button type="button" v-if="isClosed" >
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
                <button type="button" v-else >
                    <i class="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <label>{{titleName}}</label>
                <transition name=fade>
                    <div v-show="!isClosed"><slot name="header"/></div>
                    
                </transition> 
            </div>
        </header>
        <transition name=fade>
            <main v-show="!isClosed" style="height: 90%; overflow: auto">
                    <slot/>
            </main>
        </transition>  
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isClosed: false
            }
        },
        props:[
            "titleName"
            ],
        methods: {
            hasClosed: function(){
                this.isClosed = !this.isClosed;
                //  fade
                // get parent node
                var parent = this.$el.parentElement;
                // find the index of current 
                var flag_check= false;
                var item;
                var widthOld=0;
                for(item of parent.children){
                    if(item == this.$el) {
                        flag_check = true;
                        widthOld = item.children[1].clientHeight;
                        continue;
                    }
                    if(flag_check && widthOld){
                        console.log("fade offset: " + widthOld)
                        debugger
                        item.classList.add("{animation: mymove .5s both;}")
                    }
                }
            }
        }
    }
</script>

<style scoped>
    div[pn-name=root] {
        overflow: "scroll";
        color: white;
    }
    header {
        background-color: rgba(192,192,192, 0.4);
        border: 2px ridge gray;
        text-align: left;
        font-weight: bold
    }
    header label {
        padding-left: 5%;
        font-size: 14px;
        padding: 3px
    }
    header button {
        width: 30px;
        height: 20px;
        border: 1px groove grid;
    }

    main {
        padding: 0px
    }

    footer {
        border: 1px solid gray;
    }
    .move_up {
    transition: height 0.5s;
}
</style>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0;
    }
    /*.fade-enter-to {
        opacity: 0
    }*/
    /* Safari 4.0 - 8.0 */
    @-webkit-keyframes mymove {
        from {left: 10px;}
        to {left: 300px;}
    }

    /* Standard syntax */
    @keyframes mymove {
        from {height: 100%}
        to {height: 0%}
    }
</style>