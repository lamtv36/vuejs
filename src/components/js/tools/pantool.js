import config from "components/config";
var $ = config.$;
var toolConfig = config.toolConfig;
import {BaseTool} from "./basetool";

export class PanTool extends BaseTool{
    constructor(canvas){
        super();
        this.canvas = canvas;
        this.preMouse = null;
    }
    mouseDown(event){
        // var i = 0;
        // for(;i< 10000; i++){
        //     this.canvas.parentElement.scrollLeft += 1;
        //     this.canvas.parentElement.scrollTop += 1;
        // }
        this.preMouse = null;
        
    }
    mouseDrag(event){
        console.log("drag in pantool");
        if(!this.preMouse){
            debugger
            this.preMouse = event.middlePoint;
            return
        }
        var dx = event.middlePoint.x - this.preMouse.x;
        var dy = event.middlePoint.y - this.preMouse.y;
        this.preMouse = event.point;
        this.canvas.parentElement.scrollLeft -= dx;
        // this.canvas.parentElement.scrollLeft -= event.delta.x;
        this.canvas.parentElement.scrollTop -= dy;
        // this.canvas.parentElement.scrollTop -= event.delta.y;
    }
    resetCursor(){
        console.log("set cursor for EditTool")
        this.changeIcon("\uf047");
    }
}