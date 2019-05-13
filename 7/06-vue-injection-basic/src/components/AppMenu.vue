<template>
    <div class="header">
        <h2>App menu</h2>
        <div>Title: {{menu.title}}</div>
    </div>
</template>

<script lang="ts">
    import {Component, Inject, Vue} from 'vue-property-decorator';

    @Component({})
    export default class AppMenu extends Vue {
        @Inject('menu-title')
        menu!: { title: string };
    }
</script>

<style scoped>

</style>
