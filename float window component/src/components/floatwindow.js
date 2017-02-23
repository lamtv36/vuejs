//author: FPT_Lamtv3
"use strict";
var config = require("../config");
var Vue = config.Vue;
var paper = config.Paper;
/*
    float-window tag define a float window
    set size window:
    width:
    height:

*/
Vue.component ("float-window", {
    template: `
  <div v-bind:style="style" v-show="isShow">
    <div fw-name="header1" style="border-bottom:0.5px solid #2266AA; display: block;height: 30px">
        <div fw-name="header" style="width=100%; height: 30px; text-align: center"></div>
            <div fw-name="control" style="position: absolute; top: 0px; right: 0px;  border-radius: 2px">
                <div class="btn-group">
                    <button fw-name="minus" type="button" class="btn btn-default sm" style="padding: 1px; border-radius: 0px 0px 0px 5px">
                        <span class="glyphicon glyphicon-minus" style="font-size: 10px; "></span>
                    </button>
                    <button fw-name="plus" type="button" class="btn btn-default sm" style="padding: 1px">
                        <span class="glyphicon glyphicon-plus" style="font-size: 10px; "></span>
                    </button>
                    <button fw-name="remove" type="button" class="btn btn-default sm" style="padding: 1px; border-radius: 0px">
                        <span class="glyphicon glyphicon-remove" style="font-size: 10px; "></span>
                    </button>
                </div>
            </div>
        </div>
        <div fw-name="content" style="padding: 2px; margin: 1px; overflow: auto;">
            <slot/>
        </div>
    </div>
    `,
    data: function(){
        return {
            style: {
                position:'absolute', 
                width:'80px',
                height:'300px',
                top:'40px',
                left:'10px',
                border:'2px solid #2266AA',
                'background-color': 'white',
                'border-radius': '0px',
                resize: 'both'
            },
            isShow: true
        }  
    },
    mounted: function(){
        var posSize = this.getPosSize;
        if(posSize){
            this.style.width = posSize.width + "px";
            this.style.height = posSize.height + "px";
            this.style.left = posSize.x + "px";
            this.style.top = posSize.y + "px";
        }
        // get content tag
        var content = this.$el.querySelector("div[fw-name=content]");
        content.style.height= (parseInt(this.style.height) - 40) + "px"
        // check mouse click
        var ismouseclick = false;
        var offset = {
                y: 0,
                x: 0
            }
        //get position of current mouse on window
        function getPosition(e) {
            var posx = 0;
            var posy = 0;
            if (!e) var e = window.event;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX
                posy = e.clientY
            }
            return {
                x: posx,
                y: posy
            }
        }
        // initial event listener for component
        document.body.addEventListener("mousemove", event=>{
            if(!ismouseclick) return;
            // position
            // set position for float window
            var clickCoords = getPosition(event);
            var width = window.screen.availWidth;
            var height = window.screen.availHeight;
            var x = clickCoords.x;
            var y = clickCoords.y;
            // check position of float window
            // set position for window
            // if(parseInt(this.style.top) + parseInt(this.style.height) <= window.screen.availHeight)
            this.style.top = y - offset.y + "px";
            // if(parseInt(this.style.left) + parseInt(this.style.width) <= window.screen.availWidth)
            this.style.left = x - offset.x +  "px"
        });

        //listen event mouse up
        document.body.addEventListener("mouseup", event=>{
            ismouseclick=false;
            console.log("onmouseup")
            offset.x = offset.y = 0;
        });
        // change cursor when move to header of window
        // get header of float window
        var htag = this.$el.querySelector("div[fw-name=header]");
        // set event when select on header tag it allow for drag event
        htag.onmousedown = e=>{
            ismouseclick = true;
            var pos = getPosition(event);
            offset.x = pos.x - parseInt(this.style.left);
            offset.y = pos.y - parseInt(this.style.top);
        }
        // set event change cursor when mouse move to this tag
        htag.onmouseover = function(e){
            this.style.cursor = "move";
        }

        // control tag 
        var ctag = this.$el.querySelector("button[fw-name=remove]");
        // close window
        var flag_show = true;
        ctag.onmousedown = e => {
            flag_show = false;
        }
        ctag.onmouseup = e => {
            this.isShow = flag_show;
            this.$destroy();
        }
    },
    props:['width', 'height', 'styleObject', 'posSize'],
    computed: {
        getPosSize: function(){
            if(!this.posSize) return null;
            var typeobject = typeof(this.posSize);
            if(typeobject == "string")
                return JSON.parse([String(this.posSize)]);
            else if(typeobject="object"){
                return this.posSize;
            }
        }
    }
})
