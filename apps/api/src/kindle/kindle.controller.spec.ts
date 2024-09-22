import { Test, TestingModule } from '@nestjs/testing';
import { KindleController } from './kindle.controller';

describe('KindleController', () => {
  let controller: KindleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KindleController],
    }).compile();

    controller = module.get<KindleController>(KindleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
