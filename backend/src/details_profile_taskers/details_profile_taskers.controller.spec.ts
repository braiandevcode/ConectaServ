import { Test, TestingModule } from '@nestjs/testing';
import { DetailsProfileTaskersController } from './details_profile_taskers.controller';
import { DetailsProfileTaskersService } from './details_profile_taskers.service';

describe('DetailsProfileTaskersController', () => {
  let controller: DetailsProfileTaskersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailsProfileTaskersController],
      providers: [DetailsProfileTaskersService],
    }).compile();

    controller = module.get<DetailsProfileTaskersController>(DetailsProfileTaskersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
