<template>
    <div gl-name="root">
    <!--add menu to the top left side of window-->
    <input id="file" type="file" hidden>
        <header>
            <gv-menu></gv-menu>
        </header>
        <!-- main content-->
        <main>
            <!--left side-->
            <div gl-name="left">
                <transition name=fade>
                <gv-panel pn-name=controller titleName="View Controler">
                    <div>
                        <div gv-name="control">
                            <button type="button" value="curves" :class='{bt_active:bt_selected == "curves"}'>Curves</button> 
                            <button type="button" value="metrics" :class='{bt_active:bt_selected == "metrics"}'>Metrics</button> 
                            <button type="button" value="others" :class='{bt_active:bt_selected == "others"}'>Others</button> 
                        </div>
                        <form gv-name="curves" v-show="bt_selected == 'curves'">
                            <div>
                                <input type="radio" name="genner" value="fill" @click="setStyle('fill')"><label>Fill</label><br>
                                <input type="checkbox" checked><label>On Curve</label><br>
                                <input type="checkbox" checked><label>Bezier Cubic</label><br>
                            </div>
                            <div>
                                <input type="radio" name="genner" value="outline" @click="setStyle('outline')" checked><label>Outline</label><br>
                                <input type="checkbox" checked><label>Off Curve</label><br>
                                <input type="checkbox"><label>Quadratic</label><br>
                            </div>
                        </form>
                        <form gv-name="metrics" v-show="bt_selected == 'metrics'">
                            <div>
                                <input type="checkbox" checked><label>Width</label><br>
                                <input type="checkbox" checked><label>Ascender/Descender</label><br>
                                <input type="checkbox" checked><label>Palt</label><br>
                                <input type="checkbox" checked><label>Bounding Box</label><br>
                            </div>
                            <div>
                                <input type="checkbox"><label>Em Box</label><br>
                                <input type="checkbox" checked><label>Base Line</label><br>
                                <input type="checkbox" checked><label>Vpal</label><br>
                            </div> 
                        </form>
                        <form gv-name="others" v-show="bt_selected == 'others'">
                            <input type="checkbox" checked><label>Allow Dragging</label>
                        </form>
                    </div>
                </gv-panel>
                </transition>
                <transition name=fade>
                <gv-panel pn-name="tools" isClosed="false" titleName="Tools">
                    <div tool-name="gp-btns">
                        <button value="pentool" class="fa fa-pencil" :class="{toolActive: isSelected=='pentool'}"></button>
                        <button value="edittool" class="fa fa-mouse-pointer" :class="{toolActive: isSelected=='edittool'}"></button>
                        <button value="texttool" class="fa" :class="{toolActive: isSelected=='texttool'}">T</button>
                        <button value="zoomtool" class="fa fa-search-plus" :class="{toolActive: isSelected=='zoomtool'}"></button>
                        <button value="pantool" class="fa fa-arrows":class="{toolActive: isSelected=='pantool'}"></button>
                    </div>
                    <div tool-name="des">
                        <div tool-name=title>Descriptions</div>
                        <div tool-name=content><p>Description for tool</p></div>
                    </div>
                    
                </gv-panel>
                </transition>
                <gv-panel pn-name=glyph-list titleName="Glyph List" style="height: 22%;">
                    <div slot="header">
                        <!--<table style="clear: right">
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>width</th>
                                <th>height</th>
                            </tr>
                        </table>-->
                    </div>
                    
                    <!--<div >-->
                        <list-item :font="font" v-on:selection="selectGlyph"></list-item>
                        <!--<table>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>width</th>
                                <th>height</th>
                            </tr>
                            
                            <tr v-if="font" v-for="(glyph, index) of getGlyphs" @click="selectGlyph(glyph)"
                            v-bind:class='{active:index==currentGlyph}'>
                                <td>{{index}}</td>
                                <td>{{glyph.name}}</td>
                                <td>{{glyph.width}}</td>
                                <td>{{glyph.height}}</td>
                            </tr>
                        </table>-->
                    <!--</div>-->
                </gv-panel>
            </div>
            <!--right side-->
            <div gl-name="right">
                <canvas :id="id" width="10000" height="10000"></canvas>
            </div>
        </main>
        <!--footer-->
        <!--<footer></footer>-->
    </div>
</template>
<script src="./js/glyphview.js"></script>
<style src="./css/glyphview.css" scoped></style>