//author: FPT_LAMTV3
// config tools
"use strict";
var paper = require("paper");
var jquery = require("jquery");
class Config {
    constructor(){
        if(Config.INSTANCE) return Config.INSTANCE;
        this.FILL_COLOR = '#333333';
        this.BACKGROUND_COLOR = new paper.Color(1, 0, 0, 0);
        this.STROKE_COLOR = '#333333';

        this.FONT_SIZE = 14;
        this.FONT_FAMILY = "arial";
        this.MODE = { QUADRATIC: 0, CUBIC: 1 };
        this.STYLES ={
            fill: null, 
            stroke: this.STROKE_COLOR, 
            width: 1
        };
        this.STYLE_TEXT ={
            fillColor: this.FILL_COLOR, 
            fontFamily: 'Courier New',
            fontSize: 20
        };
        this.HIT_OPTIONS = { segments: true, handles: true, stroke: true, fill: true, tolerance: 5 };
        this.MODE_CURVES = this.MODE.QUADRATIC;
        this.CURRENT_GROUP = null;
        this.CURRENT_MODE = 1;
        Config.INSTANCE = this;
    }

    setMode(mode){
        this.MODE_CURVES = mode;
    }

    setStylePath(value){
        var layers = project.layers;
        var layer;
        style = this.STYLES;
        for(layer of layers){
            for(let path of layer.children){
                if(path.className == "PointText") continue;
                path.style = style;
            }
        }
    }

    setStyle(value){
        console.log("set style with value: "+ value)
        var change = false;
        if(value=="fill"){
            change = true;
            console.log("set style fill");
            this.STYLES.fill = this.FILL_COLOR;
            this.STYLES.stroke = null
        }else if(value=="outline"){
            change = true;
            console.log("set style outline");
            this.STYLES.fill = null;
            this.STYLES.stroke = this.STROKE_COLOR;
            this.STYLES.width= 1
        }
        // update canvas
        return change;
    }

    setTextColor(color){
        this.STYLE_TEXT.fillColor = color;
        this.STYLE_TEXT.strokeColor = color;
        for(layer of layers){
            for(let path of layer.children){
                if(path.className == "PointText"){
                    path.style.fillColor = color;
                }
                
            }
        }
    }
}

export default {
    toolConfig:new Config(),
    Paper: paper,
    $: jquery
}; 