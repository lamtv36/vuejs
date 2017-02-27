//author: FPT_LAMTV3
"use strict";
import config from "components/config";
var $ = config.$;
export default {
        data() {
            return {
                style: {
                    position:'absolute', 
                    width:'80px',
                    height:'max-content',
                    top:'40px',
                    left:'10px',
                    border:'2px solid #2266AA',
                    'border-radius': '5px',
                    resize: 'both',
                    'background-color': 'white'
                },
                isShow: true,
                isExpanded: false,
            }  
        },
        mounted: function(){
            var self = this;
            var posSize = this.getPosSize;
            if(posSize){
                this.style.width = posSize.width + "px";
                this.style.height = posSize.height + "px";
                this.style.left = posSize.x + "px";
                this.style.top = posSize.y + "px";
            }
            // get content tag
            // check mouse click
            var ismouseclick = false;
            var offset = {
                    y: 0,
                    x: 0
                }
            var old_size = {
                top: this.style.top,
                left:this.style.left,
                width: this.style.width,
                height: this.style.height
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
            document.addEventListener("mousemove", function(event){
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
                self.style.top = y - offset.y + "px";
                self.style.left = x - offset.x +  "px";
                old_size.top = self.style.top;
                old_size.left = self.style.left;
            });

            //listen event mouse up
            var flag_show = true;
            document.addEventListener("mouseup", function(event){
                console.log("document mouse up");
                flag_show = true;
                ismouseclick=false;
                offset.x = offset.y = 0;
            });
            // change cursor when move to header of window
            // get header of float window
            var htag = this.$el.querySelector("div[fw-name=title]");
            
            // set event when select on header tag it allow for drag event
            htag.onmousedown = function(e){
                if(!flag_show) return;
                console.log("mouse down: can drag window");
                ismouseclick = true;
                var pos = getPosition(event);
                offset.x = pos.x - parseInt(self.style.left);
                offset.y = pos.y - parseInt(self.style.top);
            }
            // set event change cursor when mouse move to this tag
            htag.onmouseover = function(e){
                self.$el.style.cursor = "move";
            }
            htag.onmouseout = function(e){
                self.$el.style.cursor = "auto";
            }
            // control tag 
            var clswd = this.$el.querySelector("button[fw-name=close]");
            // close window
            clswd.onmousedown = e => {
                console.log("mouse down: can close window");
                flag_show = false;
            }
            clswd.onmouseup = function(e){
                console.log("mouse up: closed window");
                self.isShow = flag_show;
            }
            // expand window
            var xpwd = this.$el.querySelector("button[fw-name=expand]")
            xpwd.onmousedown = function(e){
                console.log("mouse down: can expand window");
                flag_show = false;
            }
            xpwd.onmouseup = e=> {
                console.log("mouse up: expanded window");
                debugger
                if(!flag_show){
                    if(self.isExpanded){
                        self.style.top = old_size.top;
                        self.style.left = old_size.left;
                        self.style.width = old_size.width;
                        self.style.height = old_size.height;
                    }else{
                        // get scale of brower google chorme
                        var sc = window.outerWidth / window.innerWidth;
                        self.style.top = "0px";
                        self.style.left = "5px";
                        self.style.width = window.screen.availWidth/sc - 10 + "px";
                        self.style.height = window.screen.availHeight/sc- 70 + "px";
                    }
                    self.isExpanded = !self.isExpanded;
                }
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
    }