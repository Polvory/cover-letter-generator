import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }


    @Post('/create')
    @HttpCode(HttpStatus.OK)
    create(@Body() dto: CreateUser) {
        return this.usersService.create(dto)
    }

    @Get('/get')
    @HttpCode(HttpStatus.OK)
    get() {
        return this.usersService.get()
    }
}
