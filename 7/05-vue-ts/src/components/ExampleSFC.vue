<template>
    <div class="hello">
        <h1>{{ message }}</h1>
        <p>
            <span>Count:</span> {{ count }}
        </p>
        <p>
            <span>Computed property:</span> {{ someComputedProperty }}
        </p>
        <p>
            <span>Event listener:</span> <input type="button" @click="onClickHandler($event)" value="Click me!" />
        </p>
        <p>
            <span>Increment counter and emit an event:</span> <input type="button" @click="incrementCount()" value="Click me!" />
        </p>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

    @Component({})
    export default class ExampleSFC extends Vue {
        // Property
        @Prop({
            default: 'default message',
            required: false,
        })
        private message!: string;

        // Data property
        private count: number = 0;

        // Lifecycle hook
        public mounted() {
            // alert('The ExampleSFC component has just been mounted');
        }

        // Computed property
        public get someComputedProperty() {
            return 123;
        }

        // Event handler
        public onClickHandler(event: MouseEvent) {
            alert(`The button was clicked. Event: ${event}`);
        }

        // Event emitter
        @Emit('count-increased') // if not specified, then the method name is used and changed to kebab case
        public incrementCount() {
            this.count += 1;
            return this.count; // this value will be emitted
        }
    }
</script>

<!-- "scoped" below means that the styles of this component won't leak out and will only apply to this component -->
<style scoped>
    h1 {
        margin: 40px 0 0;
    }
</style>
