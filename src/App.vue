<script setup lang="ts">
/*
 * This starter template is using Vue 3 <script setup> SFCs
 * Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
 */
</script>

<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <router-link to="/demo/1">
    <div class="post-css-px-to-viewport-test">
      demo
    </div>
  </router-link>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  user-select: none;
}

.post-css-px-to-viewport-test{
 padding-bottom: 2px;
}
</style>
