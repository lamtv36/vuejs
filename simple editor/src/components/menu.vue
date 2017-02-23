<template>
    <nav>
        <input type="file" mn-id="open" hidden>
        <div class="dropdown">
            <label >File</label>
            <div class="dropdown-content">
                <ul>
                    <li>New File</li>
                    <li @click="openFile">Open</li>
                    <li>Save</li>
                    <li>Save As</li>
                    <li>Setting</li>
                    <li>Exit</li>
                </ul>
            </div>
        </div>
        <div class="dropdown">
            <a >Edit</a>
            <div class="dropdown-content">
                <ul>
                    <li>Undo</li>
                    <li>Redo</li><hr>
                    <li>Copy</li>
                    <li>Cut</li>
                    <li>Paste</li><hr>
                    <li>Zoom In</li>
                    <li>Zoom Out</li>
                </ul>
            </div>
        </div>
        <div class="dropdown">
            <a >Tools</a>
            <div class="dropdown-content">
                <ul>
                    <li>Selection</li>
                    <li>Pen</li>
                    <li>Text</li>
                    <li>Zoom</li>
                    <li>Pan</li>
                </ul>
            </div>
        </div>
        <div class="dropdown">
            <a >View</a>
            <div class="dropdown-content">
                <ul>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                </ul>
            </div>
        </div>
        <div class="dropdown">
            <a >Go</a>
            <div class="dropdown-content">
                <ul>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                </ul>
            </div>
        </div>
        <div class="dropdown">
            <label >Help</label>
            <div class="dropdown-content">
                <ul>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                    <li>number 1</li>
                </ul>
            </div>
        </div>
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
.dropdown {
    position: relative;
    display: inline-block
}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: rgba(192,192,192, 0.6);
    border: 1px solid grey
}

.dropdown:hover .dropdown-content {
    display: block;
    padding: 0px;
    margin: 0px;
    border-radius: 5px
}
.dropdown-content ul {
    list-style-type: none;
    padding: 10px;
    margin: 0px;
    text-align: left;
    width:100px;
    
}
.dropdown-content ul li{
    width: 100%;
    color: black;
    font-size: 18px;
}
.dropdown-content ul li:hover{
    background-color: lightgray;
    font-weight: bold;
    color: rebeccapurple
}
</style>