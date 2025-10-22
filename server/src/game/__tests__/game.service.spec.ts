// src/game/__tests__/game.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '../game.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGameDto } from '../dto/create-game.dto';
import { GameState } from '../game.types';
// import { GameState } from '../types/game-state.type';

describe('GameService', () => {
  let service: GameService;
  let prisma: PrismaService;

  const prismaMock = {
    game: {
      create: jest.fn().mockResolvedValue({ id: 1, state: {}, score: 0, isOver: false, userId: 1 }),
      findUnique: jest.fn().mockResolvedValue({ id: 1, state: {}, score: 0, isOver: false, userId: 1 }),
      update: jest.fn().mockResolvedValue({ id: 1, state: {}, score: 0, isOver: false, userId: 1 }),
      findMany: jest.fn().mockResolvedValue([]),
      delete: jest.fn().mockResolvedValue({ id: 1 }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create game', async () => {
    const dto: CreateGameDto = {
      state: {
        cells: [],
        score: 0,
        isOver: false,
      } as GameState,
    };

    const game = await service.create(1, dto); // ✅ передаём userId и DTO
    expect(game).toBeDefined();
    expect(prisma.game.create).toHaveBeenCalled();
  });

  it('should make move', async () => {
    const spy = jest.spyOn(service, 'findOne').mockResolvedValue({
      id: 1,
      state: { cells: [], score: 0, isOver: false },
      userId: 1,
    } as any);

    await service.makeMove(1, 'left');
    expect(spy).toHaveBeenCalledWith(1);
  });
});
