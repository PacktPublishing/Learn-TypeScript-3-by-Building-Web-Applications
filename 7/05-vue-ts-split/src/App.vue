<template>
    <div id="app">
        <Example message="Custom message" />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Example} from './components/example';

    @Component({
        components: {
            Example,
        },
    })
    export default class App extends Vue {
    }
</script>

<style>
</style>
