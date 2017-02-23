//author: FPT_Lamtv3
"use strict";
var paper = require("../../config").Paper;
var $ = require("../../config").$;
export class BaseTool {
    constructor(){
        this.tool = new paper.Tool();
        this.mousedown = this.mouseDown.bind(this);
        this.mousedrag = this.mouseDrag.bind(this);
        this.mouseup = this.mouseUp.bind(this);
        this.mousemove = this.mouseMove.bind(this);
        this.keydown = this.keyDown.bind(this);
        this.keyup = this.keyUp.bind(this);
        this.onFrame = this.onFrame.bind(this);
        this.tool.on(this);
    }
    mouseDown(event){
        console.log("mouse down");
    }
    mouseDrag(event){
        console.log("mouse drag");
    }
    mouseUp(event){
        console.log("mouse Up");
    }
    mouseMove(event){
        console.log("mouse move");
    }
    keyDown(event){
        console.log("mouse move");
    }
    keyUp(event){
        console.log("mouse move");
    }
    onFrame(event){
        console.log("onframe");
    }
    //build in function
    activate() {
        this.tool.activate();
    }
    // reset cursor for tool
    changeIcon(unicode, x=null, y=null){
        $(function() {
            var canvas = document.createElement("canvas");
            canvas.width = 24;
            canvas.height = 24;
            //document.body.appendChild(canvas);
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "#000000";
            ctx.font = "24px FontAwesome";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(unicode, 12, 12);
            var dataURL = canvas.toDataURL('image/png')
            if(x != null){
                var data = 'url('+dataURL+')'+ ' ' + x + ' ' + y + ',auto';
                debugger
                $('#canvas').css('cursor', data);
            }
            else
                $('#canvas').css('cursor', 'url('+dataURL+'), auto');
        });
    }
     resetCursor(){
         console.log("reset cursor");
        $("#canvas").css({'cursor':'auto'});
     }
}