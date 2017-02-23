<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <main-view></main-view>
  </div>
</template>

<script>
import helo from "./components/main"
        export default {
          components:{
            "main-view":helo
          }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
