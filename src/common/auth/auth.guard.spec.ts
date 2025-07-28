import { createMock } from '@golevelup/ts-jest';
import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('AuthGuard', () => {
  const authGuard = new AuthGuard();
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should return true if api key is SECRET', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': 'SECRET',
          },
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should return false if the api key is not SECRET', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });

  it('should return false if the api key is invalid', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': `INVALID`,
          },
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });
});
