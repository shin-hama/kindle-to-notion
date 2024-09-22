import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, UsersService, ConfigService],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', async () => {
    expect(guard).toBeDefined();
  });
});
