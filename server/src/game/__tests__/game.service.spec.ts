import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '../game.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Game } from '../game';

describe('GameService', () => {
  let service: GameService;
  let prismaMock: Partial<Record<keyof PrismaService, any>>;

  const gameMock: Game = new Game();

  beforeEach(async () => {
    prismaMock = {
      game: {
        create: jest.fn().mockResolvedValue({ id: 1, userId: 1, state: gameMock.getState(), score: 0, isOver: false, createdAt: new Date(), updatedAt: new Date() }),
        findMany: jest.fn().mockResolvedValue([]),
        findUnique: jest.fn().mockResolvedValue({ id: 1, userId: 1, state: gameMock.getState(), score: 0, isOver: false, createdAt: new Date(), updatedAt: new Date() }),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new game', async () => {
    const res = await service.create(1, { state: gameMock.getState() });

    expect(prismaMock.game!.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: 1,
          state: expect.objectContaining({
            cells: expect.any(Array),
            score: 0,
            isOver: false,
          }),
        }),
      }),
    );

    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('userId', 1);
  });

  it('should find all games for user', async () => {
    await service.findAll(1);
    expect(prismaMock.game!.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
      orderBy: { createdAt: 'desc' },
    });
  });

  it('should find one game by id', async () => {
    const res = await service.findOne(1);
    expect(prismaMock.game!.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res).toHaveProperty('id', 1);
  });

  it('should update game with new direction', async () => {
    const direction = 'LEFT';
    await service.update(1, direction as any);
    expect(prismaMock.game!.update).toHaveBeenCalled();
  });

  it('should remove game', async () => {
    await service.remove(1);
    expect(prismaMock.game!.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
