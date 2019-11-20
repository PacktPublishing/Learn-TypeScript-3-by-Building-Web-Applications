<template>
    <div class="header">
        <h3>User settings</h3>
        <span>Username: {{username}}</span>
        <div>
            <label> Likes chocolate?
                <input type="checkbox" value="Like chocolate" v-model="likeChocolate" />
            </label>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Inject, Vue} from 'vue-property-decorator';

    @Component({})
    export default class UserSettings extends Vue {
        @Inject('username')
        username!: string; // non-null assertion operator

        likeChocolate: boolean = true;
    }
</script>

<style scoped>

</style>
