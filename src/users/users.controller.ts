import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { userInfo } from 'os';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Swagger')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation({ summary: '유저 생성 -> 유저 아이디 반환'}) // api 설명
    @Post('/')
    @UsePipes(ValidationPipe)  //중복검사
    @ApiConsumes('multipart/form-data') // Body를 받을 때의 mime type 설정
    // Body에 대한 명세 설정
    @ApiBody({
      description: 'signup',
      type: 'number',
    })
    postSwagger() {
        return 'this is post swagger paoge';
    }
    async createUser( @Body() body ) {
        // console.log("body", body)
        const userId = await this.usersService.createUser(body.userId);
        return {"userId" : userId}
    }   

    @ApiOperation({ summary: '아이디로 유저 조회'}) 
    @ApiResponse({
        status: 403,
        description: 'get user id',
    })
    @ApiParam({
        name: 'id param',
        type: 'number',
      })
    @Get('/:id')
    async getUserById( @Param('id') userId : number): Promise<User>{
        // console.log(userId)
        return await this.usersService.getUserById(userId);
    }
}
