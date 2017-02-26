//author: FPT_Lamtv3
"use strict";
import config from "components/config";
var toolConfig = config.toolConfig;
import {BaseTool} from "./basetool";
var paper = config.Paper;

export class PenTool extends BaseTool{
    constructor(){
        super();
        //mode set type segement 
        //path of contour
        this.path=null;
        this.currentMouse = null;
        //mouse down point
        this.mouseClick = null;
        //last point
        this.lastPoint = null;
        // mouse drag point
        this.dragPoint = null;
        //mouse move point
        this.movePoint = null;
        this.layer = null;
    }
    //method create new path
    newPath() {
        console.log("add new path");
        var path = new paper.Path();    //create new path from API of paperjs
        path.onDoubleClick = (event)=> {
            this.path.closed = true;
        }
        path.style = toolConfig.STYLES;
        return path;
    }
    //path of contour
    mouseDown(event) {
        var hit_result;
        this.mouseClick = new paper.Point(event.point);
        //create new contour or new path
        if(this.path==null || this.path.closed || this.layer != paper.project.activeLayer){
            this.layer = paper.project.activeLayer;
            if(this.path) this.path.fullySelected = false;
            this.path = this.newPath();
            this.path.moveTo(this.mouseClick);
            this.currentMouse = null;
            this.lastPoint = null;
        }else if(this.closed){
            this.path.closePath();
        }
        // add first point for contour when mouse click is null
        if (this.currentMouse == null){
            this.currentMouse = new paper.Point(event.point); // create new point from paperjs API and set for mouse click
            this.mouseClick = null;
        }
        //draw a line
        else {
            // find point in current point
            hit_result = paper.project.hitTest(event.point, toolConfig.HIT_OPTIONS);
            if(this.lastPoint != null){
                this.path.lineTo(this.mouseClick);
            }
        }
        this.path.fullySelected = true;
        
    }
    mouseDrag(event) {
        var point = new paper.Point(event.point);
        var lastSegment, x, y, presegment;
        if(this.mouseClick == null) return;
        lastSegment = this.path.lastSegment;
        if(toolConfig.CURRENT_MODE == toolConfig.MODE.CUBIC){
            presegment = this.path.segments[this.path.segments.length - 2];
            presegment.handleOut.x = this.lastPoint.x;
            presegment.handleOut.y = this.lastPoint.y;
        }
        var dx = point.x - lastSegment.point.x;
        var dy = point.y - lastSegment.point.y;
        lastSegment.handleIn.x = -dx;
        lastSegment.handleIn.y = -dy;
        this.path.fullySelected = true;
    }

    mouseUp(event){
        var point = new paper.Point(event.point);
        var lastSegment = this.path.lastSegment;
        this.lastPoint = new paper.Point(point.x - lastSegment.point.x, point.y - lastSegment.point.y);
        this.mouseClick = null;
        // if(this.path.closed) this.path.fullySelected = false;
        // else this.path.fullySelected = true;
        this.path.fullySelected = true;
    }

    mouseMove(event) {
        // var hit_result = paper.project.hitTest(event.point, toolConfig.HIT_OPTIONS);
        // this.closed = false;
        // if(hit_result && this.path.segments.indexOf(hit_result.segment) == 0){
        //     var path = (new paper.Path.Circle({
        //         center: hit_result.segment.point,
        //         radius: 7,
        //         fillColor: 'blue'
        //     })).removeOnMove();
        //     this.closed = true;
        // }
    }

     resetCursor(){
        console.log("set cursor for EditTool")
        this.changeIcon("\uf040", 0, 20);
    }
}