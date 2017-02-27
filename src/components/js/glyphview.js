// author: FPT_LAMTV3
// script of glyphview component
"use strict";
import config from "components/config";
import {PenTool} from "./tools//pentool";
import {TextTool} from "./tools//texttool";
import {EditTool} from "./tools//edittool";
import {PanTool} from "./tools//pantool";
var $ = config.$;
var paper = config.Paper;
import Panel from 'components/Panel';
import Menu from 'components/Menu';
import ListItem from 'components/list';
var viewConfig = config.toolConfig;
export default {
    name: "glyph-view",
    components:{
        'gv-panel': Panel,
        "gv-menu": Menu,
        "list-item": ListItem
    },
    data(){
        return {
            style: {
                resize: "both"
            },
            hit_options : {
                segments: true,
                handles: true,
                fill: true,
                tolerance: 5
            }, // End hit_options
            tool:null, // Todo,
            sel_segment:null,
            handle_in:null, 
            handle_out:null,
            par_segment:null,
            glyph_path : null,
            currentGlyph: null,
            bt_selected: "curves",
            isSelected: "pentool",
            font: null,
            ctx: null
        }
    },
    mounted: function(){
        // register canvas for paper
        paper.setup(this.id)
        var canvas = document.getElementById(this.id);
        this.ctx = canvas.getContext("2d");
        paper.install(window);
        window.glyph = null;
        var self_root = this;
        $("div[gl-name=right]")[0].scrollTop = 4555;
        $("div[gl-name=right]")[0].scrollLeft = 4800;
        debugger
        function openTool(toolName){
    // var canvas = document.getElementById("canvas");
            var tool = tools[toolName];
            if(tool == undefined){
                if(toolName == "pentool")
                    tool = new PenTool();
                else if(toolName == "edittool")
                    tool = new EditTool();
                else if(toolName == "texttool")
                    tool = new TextTool();
                else if(toolName == "pantool"){
                     tool = new PanTool(canvas);
                }
                   
                if(tool != undefined) tools[toolName] = tool;
            }
            if(tool != undefined){
                tool.resetCursor();
                tool.activate();
            }
            // else throw new Error("can't find any tool name " + toolName);
        }
        // add event select tool
        var items = this.$el.querySelector("div[tool-name=gp-btns]").children;
            for(var item of items){
            item.onclick = function(e){
                debugger
                self_root.isSelected = e.target.value;
                console.log(e.target.value);
                openTool(self_root.isSelected)
            }
        }
        // set call back for button
        items = this.$el.querySelector("div[gv-name=control]").children;
        for(var item of items){
            item.onclick = e=>{
            this.bt_selected = e.target.value;
            console.log(e.target.value)
            }
        }
    },
    props: ["dataFont", "id"],
    computed:{
        getFont: function(){
            var font = null;
            if(this.font){
                font = this.font;
            }
            else if(this.dataFont){
                font = this.dataFont;
            }
            return font;
        },
        getGlyphs: function(){
            var glyphs = [];
            // font in local component
            if(this.font){
                glyphs = this.font.glyphs.glyphs;
            }
            // check glyph binding
            else if(this.glyphs){
                glyphs = this.glyphs;
            }
            // font data binding in this component
            else if(this.dataFont){
                glyphs = this.dataFont.glyphs.glyphs;
            }
            // return list glyphs
            return glyphs
        },
        //  get list glyphs name
        glyphNames: function(name){
            if(this.getFont){
                return this.getFont.glyphsNames;
            }
            else return [];
        }
    },
    methods: {
        // change glyph in canvas view
        selectGlyph: function(glyph){
            if(window.glyph != glyph) window.glyph = glyph;
            debugger
            this.drawglyph(glyph);
            console.log("draw glyph name: "+ glyph.name);
            this.currentGlyph = glyph.index;
        },
        // draw glyph to canvas view
        drawglyph: function(glyph){
            var ctx = this.ctx;
            function updateView(){
                ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
            }
            if(ctx){
                // clear view 
                updateView();
                // draw glyph
                // get path of glyph
                var path = glyph.getPath(5000, 5000, 500);
                // set style for glyph
                path.fill = viewConfig.STYLES.fill;
                path.stroke = viewConfig.STYLES.stroke;
                path.draw(this.ctx);
                
                // draw metrics
                // glyph.drawMetrics(this.ctx, 5000, 5000, 500);
                // draw marker point
                // glyph.drawPoints(this.ctx, 5000, 5000, 500);
            }
        }, // end draw glyph method
        setStyle(value){
            if(viewConfig.setStyle(value))
                this.drawglyph(this.getGlyphs[this.currentGlyph])
        },
        showPoint(value){
            // show/hide oncurve point
            if(value=="onCurve"){

            }
            // show/hide offcurve point
            else if(value == "offCurve"){

            }
        }
    }
}