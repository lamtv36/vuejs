<template>
    <div fw-name='root':style="style" v-show="isShow">
        <header>
            <slot name="header"/>
            <div fw-name="title">
                <div fw-name="name-wd">float window</div>
                <div fw-name="bts-ctrl" class="bts-control">
                    <button fw-name="minus" type="button" class="fw-btn fa fa-window-minimize"></button>
                    <button fw-name="expand" type="button" class="fw-btn fa" 
                    :class='{"fa-window-restore": isExpanded, "fa-window-maximize": !isExpanded}'></button>
                    <button fw-name="close" type="button" class="fw-btn fa fa-times"></button>
                </div>
            </div>   
        </header>
        <main><slot/></main>
        <footer><slot name="footer"/></footer>
    </div>
</template>
<script src="./js/floatwindow.js"></script>
<style src="./css/floatwindow.css" scoped></style>
