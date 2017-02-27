<template>
    <nav>
        <input type="file" mn-id="open" hidden>
        <ul>
            <li class="parent-mn">File
                <ul class="sub-mn">
                    <li>New File</li>
                    <li @click="openFile">Open</li>
                    <li>Save</li>
                    <li>Save As</li>
                    <li>Setting</li>
                    <li>Exit</li>
                </ul>
            </li>
            <li class="parent-mn">Edit
                <ul class="sub-mn">
                    <li>Undo</li>
                    <li>Redo</li><hr>
                    <li>Copy</li>
                    <li>Cut</li>
                    <li>Paste</li><hr>
                    <li>Zoom In</li>
                    <li>Zoom Out</li>
                </ul>
            </li>
            <li class="parent-mn">Tools
                <ul class="sub-mn">
                    <li>Selection</li>
                    <li>Pen</li>
                    <li>Text</li>
                    <li>Zoom</li>
                    <li>Pan</li>
                </ul>
            </li>
            <li class="parent-mn">View
                <ul class="sub-mn">
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                </ul>
            </li>
            <li class="parent-mn">Go
                <ul class="sub-mn">
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                </ul>
            </li>
            <li class="parent-mn">Help
                <ul class="sub-mn">
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                </ul>
            </li>
        </ul>
    </nav>
</template>
<script>
    import $ from "jquery";
    window.font = null;
    export default {
        data(){
            return{
                font: null
            }
        },
        mounted:function(){
            var ip = this.$el.querySelector("input[mn-id=open]");
            var self_root = this;
            var fontFileName = 'static/fonts/Arial Italic.otf';
            opentype.load(fontFileName, function(err, font) {
                var amount, glyph, ctx, x, y, fontSize;
                if (err) {
                    alert(err.toString());
                    return;
                }
                self_root.$parent.font = font;
            });
            ip.addEventListener("change", function(e){
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        self_root.$parent.font = opentype.parse(e.target.result);
                        window.font = self_root.$parent.font;
                    } catch (err) {
                        alert(err.toString());
                    }
                }
                reader.onerror = function(err) {
                    alert(err.toString());
                }
                reader.readAsArrayBuffer(file);
                if(self_root.$parent.font && self_root.$parent.font.glyphs && self_root.$parent.font.glyphs.glyphs){
                    self_root.$parent.glyphs = self_root.$parent.font.glyphs.glyphs;
                    alert("Font opened");
                    
                }
                else{
                    alert("can't open font");
                    console.log(self_root.$parent.font)
                }
            }, false)
        },
        methods:{
            openFile(e){
                console.log("select file font");
                var ip = this.$el.querySelector("input[mn-id=open]");
                ip.click();
            }
        }
    }
</script>
<style>
/*menu drop down*/
nav, ul, li{
	margin: 0px;
    padding: 1px 4px 1px 0px;
    width: max-content;
    cursor: pointer;
}
.parent-mn{   
	position: relative;
    list-style: none;
    display: inline-block;
    margin: 1px 4px 1px 4px;
}
.parent-mn:hover{
	background-color: rgba(192, 192, 192, .5);
}
.sub-mn{
    display: block;
	position: absolute;
	visibility: hidden;
    border-radius: 0px 0px 10px 10px;
    max-height: 0px;
    transition: max-height 2s;
    border: 1px inset gray;
}
.parent-mn:hover .sub-mn{
	visibility: visible;
    list-style: none;
    background-color: rgba(250, 250, 250, .9);
    white-space: nowrap;
    max-height: 999px
}
.parent-mn:hover .sub-mn li{
    color: black;
}
.sub-mn li {
    color: rgba(255,255,255, 0);
    transition: color 2s;
    padding: 2px;
    margin: 4px;
}
.sub-mn li:hover{
	background-color: purple;
    width: 100%;
    text-align: left;
    color: white; 
    padding-left: 0px; 
    padding-right: 0px;
}
</style>