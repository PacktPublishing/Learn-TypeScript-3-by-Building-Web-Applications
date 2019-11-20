<template>
    <div id="app">
        <ExampleSFC message="Custom message" v-on:count-increased="onCountIncreased($event)" />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ExampleSFC from './components/ExampleSFC.vue';

    @Component({
        components: {
            ExampleSFC,
        },
    })
    export default class App extends Vue {
        public onCountIncreased(event: any) {
            alert(`New count: ${event}`);
        }
    }
</script>

<style>
</style>
