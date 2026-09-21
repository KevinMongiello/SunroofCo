import { Test, TestingModule } from '@nestjs/testing';
import { TimecardsController } from './timecards.controller.js';

describe('TimecardsController', () => {
  let controller: TimecardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimecardsController],
    }).compile();

    controller = module.get<TimecardsController>(TimecardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
