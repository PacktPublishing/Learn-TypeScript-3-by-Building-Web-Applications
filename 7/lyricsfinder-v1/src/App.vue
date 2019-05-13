<template>
  <el-container class="lf-wrapper">
    <el-header height="150px" class="lf-header">
      <el-image :src='require(`@/assets/logo.png`)' class="lf-header-logo" fit="contain" lazy/>
    </el-header>
    <el-main class="lf-main">
      <el-row type="flex">
        <el-col :span="4"></el-col>
        <el-col :span="16">
          <router-view></router-view>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </el-main>
    <el-footer class="lf-footer">
      Powered by TypeScript and Vue.JS!
    </el-footer>
  </el-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {
        },
    })
    export default class App extends Vue {
    }
</script>

<style>
  :root {
    --font-color: #fff;
    --background-color: #0e4868;
  }

  .lf-wrapper {
    border-radius: 3px 3px 20px 20px;
    border: 20px solid var(--background-color);
  }

  .lf-header, .lf-main, .lf-footer {
    background-color: var(--background-color);
    text-align: center;
  }

  .lf-header, .lf-footer {
    vertical-align: middle;
    color: var(--font-color);
  }

  .lf-header-logo {
    height: 100%;
  }

  .lf-footer {
    line-height: 60px;
  }
</style>
