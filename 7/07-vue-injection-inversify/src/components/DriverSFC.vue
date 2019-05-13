<template>
    <div class="hello">
        <h1>{{ driver }}</h1>
    </div>
</template>

<script lang="ts">
    import {Component, Inject, Vue} from 'vue-property-decorator';
    import {Container} from 'inversify';
    import {Driver} from '@/domain/driver';
    import {TYPES} from '@/ioc-types';

    @Component({})
    export default class DriverSFC extends Vue {
        @Inject(TYPES.CONTAINER)
        private _container!: Container;

        private _driver!: Driver;

        // Lifecycle hook
        public created() {
            console.log('Initializing Driver');
            console.log('IoC container retrieved: ', this._container);
            this._driver = this._container.get<Driver>(TYPES.DRIVER);
            console.log('Retrieved driver: ', this._driver);
            console.log('Driver initialized');
        }

        public get driver(): string {
            return this._driver.description;
        }
    }
</script>

<style scoped>

</style>
