<!--author: FPT_Lamtv3-->
<template>
    <div>
        <table>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>width</th>
                <th>height</th>
            </tr>
            <tr v-if="font" v-for="(glyph, index) of glyphs" @click="selection(glyph)" 
                >
                <td>{{glyph.index}}</td>
                <td>{{glyph.name}}</td>
                <td>{{glyph.advanceWidth}}</td>
                <td>{{glyph.advanceHeight}}</td>
            </tr>
        </table>
    </div>

</template>
<script>
    import config from "components/config";
    var $ = config.$;
    export default{
        data(){
            return{
                glyphs: []
            }
        },
        props: ["font"],
        mounted:function(){
            var num = 0;
            this.$el.style.height = 12 * 2515 + "px";
            // handle event scroll
            var self_list = this;
            // this.glyphs = this.font.glyphs.glyphs;
            this.$el.parentElement.onscroll=function(e){
                if(self_list.font) {
                    if(self_list.$el){
                        var height = 12;
                        var start = parseInt(self_list.$el.parentElement.scrollTop/height);
                        debugger
                        self_list.$el.style.top = self_list.$el.parentElement.scrollTop + "px";
                        var num = self_list.$el.parentElement.clientHeight/ height;
                        self_list.glyphs = []
                        for(let i= start; i < num + start; i ++){
                            let va = self_list.font.glyphs.glyphs[i];
                            if(va == undefined) continue;
                            self_list.glyphs.push(va);
                        }
                    }
                }
                console.log(self_list.glyphs)
                console.log("start" + start)
                console.log("num" + num)
            }
            
        },
        computed:{
            // glyphs(){
            //     if(this.font && this.font.glyphs){
            //         return this.font.glyphs.glyphs;
            //     }
            //     return [];
            // }
            // glyphs(){
            //     if(this.font) {
            //         if(this.$el){
            //             var height = 12;
            //             var start = this.$el.scrollTop/height;
            //             var top = this.$el.style.top;
            //             var num = this.$el.parentElement.clientHeight/ height;
            //             var a = []
            //             for(let i= start; i < num + start; i ++){
            //                 let va = this.font.glyphs.glyphs[i];
            //                 if(va == undefined) continue;
            //                 a.push(va);
            //             }
            //             return a;
            //         }
            //     }
            //     return [];
            // },
        },
        methods:{
            selection(glyph){
                console.log("binding console")
                this.$emit("selection", glyph);
            }
        }
    }
</script>
<style scoped>
div {
    position: relative;
    /*overflow: scroll;*/
    height: 100%;
} 
table{
    border-collapse: collapse
}
tr, th, td {
    border: 1px inset grey;
    font-size: 12px;
}
</style>