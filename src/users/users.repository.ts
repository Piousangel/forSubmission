// import {EntityRepository, Repository } from "typeorm";
// import { User } from "./users.entity";
// // import { CreateUserDto } from "src/dto/create-user.dto";
// // import { CustomRepository } from "src/db/typeorm-ex.decorator"; 

// // @CustomRepository(User)
// @EntityRepository(User)
// export class UserRepository extends Repository<User> {

//     async createUser(userId : number) : Promise<User> {
//         const user = this.create({ 
//           userId,
//           totalScore : 0,
//           isEntered : false,
          
//         })

//         await this.save(user);
//         return user;
//     }
    
// }