import { Test, TestingModule } from '@nestjs/testing';
import { ElectionAdminService } from './election-admin.service';

describe('ElectionAdminService', () => {
  let service: ElectionAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectionAdminService],
    }).compile();

    service = module.get<ElectionAdminService>(ElectionAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
