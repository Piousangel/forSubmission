import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';


describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be 4', () => {
        expect(2+2).toEqual(4);
    })
})

//getAll(), getOne(), deleteOne(), create(), update()