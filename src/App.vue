<template>


<home_component></home_component>


  </template>
  <script>


import home_component from './components/home_component.vue';


  export default {
    name: 'App',
    components: {
    home_component
    }
  }
  </script>
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>

