<template>
    <div class="header">
        <h1>Page header</h1>
        <AppMenu/>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import AppMenu from '@/components/AppMenu.vue';

    @Component({
        components: {
            AppMenu,
        },
    })
    export default class PageHeader extends Vue {
        @Provide('menu-title')
        menuContents: { title: string } = { title: 'Foo' };
    }
</script>

<style scoped>

</style>
