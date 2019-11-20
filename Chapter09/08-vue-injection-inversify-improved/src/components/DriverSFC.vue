<template>
    <div class="hello">
        <h1>{{ driver }}</h1>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Driver} from '../domain/driver';
    import {TYPES} from '@/ioc-types';
    import {container} from '../ioc-config';
    import getDecorators from 'inversify-inject-decorators';

    const { lazyInject } = getDecorators(container);

    @Component({})
    export default class DriverSFC extends Vue {

        @lazyInject(TYPES.DRIVER)
        private _driver!: Driver;

        // Lifecycle hook
        public created() {
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
