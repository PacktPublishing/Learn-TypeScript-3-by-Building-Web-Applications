<template>
    <div class="header">
        <h2>Settings</h2>
        <UserSettings />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import UserSettings from '@/components/UserSettings.vue';

    @Component({
        components: {
            UserSettings,
        }
    })
    export default class Settings extends Vue {
    }
</script>

<style scoped>

</style>
