<template>
    <div id="app">
        <DriverSFC />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import DriverSFC from '@/components/DriverSFC.vue';

    @Component({
        components: {
            DriverSFC,
        },
    })
    export default class App extends Vue {
    }
</script>

<style>
</style>
