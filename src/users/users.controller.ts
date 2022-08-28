import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { userInfo } from 'os';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    //유저 생성 -> 유저 아이디 반환
    @Post('/')
    @UsePipes(ValidationPipe)  //중복검사
    async createUser( @Body() body ) {
        // console.log("body", body)
        const userId = await this.usersService.createUser(body.userId);
        return {"userId" : userId}
    }   

    // 아이디로 유저 조회
    @Get('/:id')
    async getUserById( @Param('id') userId : number): Promise<User>{
        // console.log(userId)
        return await this.usersService.getUserById(userId);
    }
}
