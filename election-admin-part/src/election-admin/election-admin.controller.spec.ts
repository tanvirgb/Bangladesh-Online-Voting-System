import { Test, TestingModule } from '@nestjs/testing';
import { ElectionAdminController } from './election-admin.controller';
import { ElectionAdminService } from './election-admin.service';

describe('ElectionAdminController', () => {
  let controller: ElectionAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionAdminController],
      providers: [ElectionAdminService],
    }).compile();

    controller = module.get<ElectionAdminController>(ElectionAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
