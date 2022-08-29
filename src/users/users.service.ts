import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './users.entity';


@Injectable()
export class UsersService {

    constructor(
        
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ){}

    async createUser(userId : number) {
        //console.log("userId in create!!", userId)
        const user = this.userRepository.create({
            userId : userId,
            score: 0,
            
            //isEntered : false
        })
        //console.log("data is stored1111");
        await this.userRepository.save(user);
        //console.log("data is stored2222");
        return user.userId;
        
    }

    async getUserById(userId : number) : Promise <User> {
        //console.log("hjihi")
        //log("userid123123",userId)
        const serach = await this.userRepository.findOne({
            where: {userId : userId},
            relations:{
                //score: true,
                raidRecords : true,
            }
        });

        

        if(!serach){
            throw new NotFoundException(`회원을 찾을 수 없습니다 ${userId}`);
        }
        return serach;
    }
}
