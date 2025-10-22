import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { Direction } from 'server/src/game/game.types';
import { AppModule } from 'server/src/app.module';
import { PrismaService } from 'server/src/prisma/prisma.service';

describe('GameModule (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let gameId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await prisma.$connect();

    await prisma.game.deleteMany({});
    await prisma.user.deleteMany({});

    const user = { email: 'game@test.com', password: '123456' };
    await request(app.getHttpServer()).post('/auth/signup').send(user);
    const loginRes = await request(app.getHttpServer()).post('/auth/login').send(user);
    token = loginRes.body.access_token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('should create a new game', async () => {
    const res = await request(app.getHttpServer())
      .post('/game')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(201);

    expect(res.body).toHaveProperty('id');
    gameId = res.body.id;
  });

  it('should fetch all games for user', async () => {
    const res = await request(app.getHttpServer())
      .get('/game')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch a single game by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/game/${gameId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.id).toBe(gameId);
  });

  it('should perform a move in one direction', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/game/${gameId}/move`)
      .set('Authorization', `Bearer ${token}`)
      .send({ direction: Direction.LEFT })
      .expect(200);

    expect(res.body).toHaveProperty('state');
  });

  it('should delete a game', async () => {
    await request(app.getHttpServer())
      .delete(`/game/${gameId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
