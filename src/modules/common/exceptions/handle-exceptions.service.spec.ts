import { Test, TestingModule } from '@nestjs/testing';
import { HandleExceptionsService } from './handle-exceptions.service';

describe('HandleExceptionsService', () => {
  let service: HandleExceptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandleExceptionsService],
    }).compile();

    service = module.get<HandleExceptionsService>(HandleExceptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
