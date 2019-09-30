<template>
    <div class="header">
        <h1>Content</h1>
        <Settings/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Settings from '@/components/Settings.vue';

    @Component({
        components: {
            Settings,
        },
        provide: {
            // if you uncomment this line and run the application
            // you'll see that even though the "username" key was used
            // higher in the component tree, this definition wins and overrides the previous value associated with the key
            //'username': 'last writer wins',
        },
    })
    export default class Content extends Vue {
    }
</script>

<style scoped>

</style>
