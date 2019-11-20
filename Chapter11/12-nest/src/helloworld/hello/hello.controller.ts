import {Controller, Get, Query} from '@nestjs/common';

@Controller('/')
export class HelloController {
    @Get('hello')
    hello(@Query('name') name?: string) {
        const personName = name? name: 'stranger';
        return `Hello ${personName}`;
    }
}
