"use strict";
var paper = require("../config").Paper;

class Config {
    constructor(){
        if(Config.INSTANCE) return Config.INSTANCE;
        this.FILL_COLOR = '#333333';
        this.BACKGROUND_COLOR = new paper.Color(1, 0, 0, 0);
        this.STROKE_COLOR = '#333333';
        this.FONT_SIZE = 14;
        this.FONT_FAMILY = "arial";
        this.MODE = { QUADRATIC: 0, CUBIC: 1 };
        this.STYLES ={fillColor: this.BACKGROUND_COLOR, strokeColor: this.STROKE_COLOR, strokeWidth: 1};
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
}
module.exports.config = new Config();

var setMode = (mode)=>{
    config.MODE_CURVES = mode;
}

var setStylePath = (value)=> {
    var layers = project.layers;
    var layer;
    style = config.STYLES;
    for(layer of layers){
        for(let path of layer.children){
            if(path.className == "PointText") continue;
            path.style = style;
        }
    }
}

var setTextColor = (color)=>{
    config.STYLE_TEXT.fillColor = color;
    config.STYLE_TEXT.strokeColor = color;
    for(layer of layers){
        for(let path of layer.children){
            if(path.className == "PointText"){
                path.style.fillColor = color;
            }
            
        }
    }
}