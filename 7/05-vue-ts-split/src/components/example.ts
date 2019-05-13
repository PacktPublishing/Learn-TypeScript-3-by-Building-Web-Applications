import {Component, Prop, Vue} from 'vue-property-decorator';

import WithRender from './example.html';

@WithRender
@Component
export class Example extends Vue {
    @Prop({
        default: 'default message',
        required: false,
    })
    private message!: string;
}
