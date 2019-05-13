<template>
  <el-container class="lf-search">
    <el-input v-model="searchText" @keyup.enter.native="searchHandler()" clearable
              placeholder="Artist or song to search for" prefix-icon="el-icon-search">
      <el-button slot="append" type="primary" icon="el-icon-search" @click="searchHandler()">Search</el-button>
    </el-input>
  </el-container>
</template>

<script lang="ts">
  import {Component, Emit, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Search extends Vue {
    private searchText = '';

    public searchHandler(): void {
      if ('' !== this.searchText) {
        this.emitSearchEvent();
      } else {
        this.emitSearchClearedEvent();
      }
    }

    @Emit('search-triggered')
    public emitSearchEvent(): string {
      console.log('Emitting search triggered event');
      return this.searchText;
    }

    @Emit('search-cleared')
    public emitSearchClearedEvent(): void {
      return;
    }
  }
</script>

<style scoped>
  .lf-search {
    width: 100%;
  }
</style>
