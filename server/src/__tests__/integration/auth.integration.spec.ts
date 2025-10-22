import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'server/src/app.module';
import { PrismaService } from 'server/src/prisma/prisma.service';

describe('AuthModule (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const userDto = {
    email: 'integration@test.com',
    password: 'test1234',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await prisma.$connect();

    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('should register a new user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(userDto)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(userDto.email);
  });

  it('should login and return a JWT token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userDto)
      .expect(201);

    expect(res.body).toHaveProperty('access_token');
    process.env.TEST_JWT = res.body.access_token;
  });
});
