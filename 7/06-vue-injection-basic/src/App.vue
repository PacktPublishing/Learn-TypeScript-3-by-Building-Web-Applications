<template>
    <div id="app">
        <PageHeader />
        <Content />
        <PageFooter />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import PageHeader from '@/components/PageHeader.vue';
    import PageFooter from '@/components/PageFooter.vue';
    import Content from '@/components/Content.vue';

    @Component({
        components: {
            PageHeader,
            Content,
            PageFooter,
        },
        provide: {
            'username': 'dSebastien',
        },
    })
    export default class App extends Vue {
    }
</script>

<style>
</style>
