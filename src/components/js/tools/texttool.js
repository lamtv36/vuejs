//author: FPT_Lamtv3
"use strict";
import {BaseTool} from "./basetool";
import config from "components/config";
var $ = config.$;
var toolConfig = config.toolConfig;
var paper = config.Paper;

export class TextTool extends BaseTool{
    constructor(){
        super();
        this.loadView();
        this.cText = null;
    }

    loadView(){
        console.log("text tool");
        //set position of canvas
    }

    mouseDown(event){
        var hit_result = paper.project.hitTest(event.point, toolConfig.HIT_OPTIONS);
        if(hit_result){
            this.cText = hit_result.item;
        }
        else{
            this.cText = new paper.PointText(new Point(event.point));
            this.cText.style = toolConfig.STYLE_TEXT;
            this.cText.fullySelected = true;
        }
    }

    mouseUp(event){

    }
    mouseDrag(event){
        
    }

    keyDown(event){
        console.log(event.key)
        console.log(event.character)
        if(event.key == "delete"||event.key == "backspace"){
            if(this.cText){
                this.cText.content = this.cText.content.slice(0, this.cText.content.length - 1)
            }else{
                this.cText = null;
            }
        }
        if(event.key == "control"){
            return;
        }
        if(this.cText){
            console.log(event);
            this.cText.content += event.character;
        }
    }

    keyUp(event){

    }
    resetCursor(){
        $("#gl-canvas").css({'cursor':'text'});
    }
}