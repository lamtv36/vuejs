<template>
  <div class="hello">
   <!--<h1>float window component</h1>-->
   <float-window posSize='{"x": 20, "y": 20, "width": 1030, "height": 680}'>
     <glyph-view :data='data' id="gl-canvas"></glyph-view>
   </float-window>
    <!--<h1>glyph view component</h1>-->
    
    <!--<h1>Panel component</h1>-->
    <!--<panel>
        <label slot="header">Here might be a page title</label>
        <div in style="text-align: center">
          <p>A paragraph for the main content.</p>
          <p>And another one.</p>
        </div>
    </panel>-->
  </div>
</template>

<script>
var glyphdata = require("data/load_glyph_sample").glyphs;
// require("./config");
import FloatWindow from './floatwindow';
import GlyphView from './GlyphView';
import Panel from './Panel';
export default {
  data () {
    return {
      data: glyphdata
    }
  },
  components: {
    "float-window": FloatWindow,
    "glyph-view": GlyphView,
    "panel": Panel,
  }
}
// require("./js/database.js");
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: lightblue
    }
</style>
