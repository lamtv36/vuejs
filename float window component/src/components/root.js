//author: FPT_Lamtv3
"use strict";
var config = require("../config");
var Vue = config.Vue;
var paper = config.Paper;
var $ = require("../config").$;
import {PenTool} from "../js//tools//pentool";
import {TextTool} from "../js//tools//texttool";
import {EditTool} from "../js//tools//edittool";

// create root app component
Vue.component("app",{
    template:`
    <div id="layer-id">
        <float-window id="w-canvas" posSize='{"x": 200, "y": 200, "width": 800, "height":600}' style="border-radius: 10px 10px 10px 10px">
            <canvas style="border: 1px solid red" id = "canvas" class="task" width="2000" height="600" ressize></canvas>
        </float-window>
        <float-window id="w-control" v-bind:posSize='posSize' style="border-radius: 10px 10px 10px 10px; " styleObject="{'overflow': 'visible'}">
           <div id="bts" class="btn-group-vertical">
                <button id="pt" type="button" class="btn btn-default btn-lg">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button id="edt" type="button" class="btn btn-default btn-lg">
                    <i class="fa fa-mouse-pointer" aria-hidden="true"></i>
                </button>
                <button id="tt" type="button" class="btn btn-default btn-lg">
                     <b style="font-size: 24px">T</b>
                </button>
                <button id="as" type="button" class="btn btn-default btn-lg">
                    <span class="glyphicon glyphicon-zoom-in"></span>
                </button>
            </div>
        </float-window>
    </div>
    `,
    data: function(){
        return{
            posSize: {"x": 10, "y": 200, "width": 80, "height": 250},
            tools: []        
        }
    },
    mounted:function(){
        paper.setup("canvas")
        paper.install(window);
        function openTool(toolName){
    // var canvas = document.getElementById("canvas");
            var tool = tools[toolName];
            if(tool == undefined){
                if(toolName == "pt")
                    tool = new PenTool();
                else if(toolName == "edt")
                    tool = new EditTool();
                else if(toolName == "tt")
                    tool = new TextTool();
                if(tool != undefined) tools[toolName] = tool;
            }
            if(tool != undefined){
                tool.resetCursor();
                tool.activate();
            }
            else throw new Error("can't find any tool name " + toolName);
        }
        // add event select tool
        var bts = this.$el.querySelector("#bts");
        for(var bt of bts.children){
            bt.onclick = function(e){
                console.log(this.id)
                openTool(this.id)
            }
        }

        // drag and drop
        // get canvas float window
        var fcanvas = this.$el.querySelector("#w-canvas");
        fcanvas.ondrop = function(event){
            event.preventDefault();
            debugger
            var data =event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data));
        }
        fcanvas.ondragover = function(event){
            event.preventDefault();
        }

        var fcontrol = this.$el.querySelector("#w-control");
        fcontrol.ondragstart = function(event){
            event.dataTransfer.setData("text", event.target.id);
        }
    },
    props: ['message']
       
})
