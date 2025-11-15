import { Test, TestingModule } from '@nestjs/testing';
import { DetailsProfileTaskersService } from './details_profile_taskers.service';

describe('DetailsProfileTaskersService', () => {
  let service: DetailsProfileTaskersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailsProfileTaskersService],
    }).compile();

    service = module.get<DetailsProfileTaskersService>(DetailsProfileTaskersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
