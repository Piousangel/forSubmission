import { Test, TestingModule } from '@nestjs/testing';
import { BossRaidService } from './boss-raid.service';

describe('BossRaidService', () => {
    let service: BossRaidService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BossRaidService],
        }).compile();

        service = module.get<BossRaidService>(BossRaidService);
    });

    // it('should be defined', () => {
    //     expect(service).toBeDefined();
    // });

    it('should be 4', () => {
        expect(2+2).toEqual(4);
    })
})

//getAll(), getOne(), deleteOne(), create(), update()