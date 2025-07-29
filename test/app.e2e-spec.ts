/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: any;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();
    appService = app.get<AppService>(AppService);
    await app.init();
  });

  describe('/GET', () => {
    it('should return 403 when the api key is not included', () => {
      return request(server).get('/').set(`x-api-key`, `INVALID`).expect(403);
    });

    it('should return 403 when no api-key is passed', () => {
      return request(server).get('/').expect(403);
    });

    it(`should return a random emoji`, () => {
      const emojis = appService.getEmojis();
      return request(app.getHttpServer())
        .get('/')
        .set(`x-api-key`, `SECRET`)
        .set(`user-agent`, `Chrome`)
        .expect(200)
        .expect(({ body }) => {
          const response = body.data;
          expect(response).toBeDefined();
          expect(response.browser).toBe(`Chrome`);
          expect(emojis).toContain(response.emoji);
        });
    });
  });
});
