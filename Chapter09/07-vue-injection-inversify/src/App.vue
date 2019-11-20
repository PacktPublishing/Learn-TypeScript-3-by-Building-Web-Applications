<template>
    <div id="app">
        <DriverSFC />
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import DriverSFC from '@/components/DriverSFC.vue';
    import {container as iocContainer} from '@/ioc-config';
    import {TYPES} from '@/ioc-types';
    import {Container} from 'inversify';

    @Component({
        components: {
            DriverSFC,
        },
    })
    export default class App extends Vue {
        @Provide(TYPES.CONTAINER)
        private container: Container = iocContainer;
    }
</script>

<style>
</style>
