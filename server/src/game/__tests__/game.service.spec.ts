import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '../game.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { GameState } from '../game.types';
import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';

describe('GameService', () => {
  let service: GameService;
  let prisma: PrismaService;

  const mockPrisma = {
    game: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const userId = 1;
  const gameId = 1;

  const mockState: GameState = {
    cells: [
      { id: 1, col: 0, row: 0, value: 2 },
      { id: 2, col: 1, row: 0, value: 4 },
    ],
    score: 6,
    isOver: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should create a game', async () => {
    mockPrisma.game.create.mockResolvedValue({ id: gameId, userId, state: mockState });
    const dto: CreateGameDto = { state: mockState };

    const result = await service.create(userId, dto);
    expect(result).toEqual({ id: gameId, userId, state: mockState });
    expect(mockPrisma.game.create).toHaveBeenCalledWith({
      data: { userId, state: mockState },
    });
  });

  it('should return all games for user', async () => {
    mockPrisma.game.findMany.mockResolvedValue([{ id: gameId, userId, state: mockState }]);

    const result = await service.findAll(userId);
    expect(result).toEqual([{ id: gameId, userId, state: mockState }]);
    expect(mockPrisma.game.findMany).toHaveBeenCalledWith({
      where: { userId },
      orderBy: { id: 'desc' },
    });
  });

  it('should return a single game', async () => {
    mockPrisma.game.findFirst.mockResolvedValue({ id: gameId, userId, state: mockState });

    const result = await service.findOne(userId, gameId);
    expect(result).toEqual({ id: gameId, userId, state: mockState });
    expect(mockPrisma.game.findFirst).toHaveBeenCalledWith({
      where: { id: gameId, userId },
    });
  });

  it('should throw NotFoundException if game not found', async () => {
    mockPrisma.game.findFirst.mockResolvedValue(null);

    await expect(service.findOne(userId, gameId)).rejects.toThrow(NotFoundException);
  });

  it('should update a game', async () => {
    mockPrisma.game.findFirst.mockResolvedValue({ id: gameId, userId, state: mockState });
    mockPrisma.game.update.mockResolvedValue({ id: gameId, userId, state: mockState });

    const updateDto: UpdateGameDto = { state: mockState };
    const result = await service.update(userId, gameId, updateDto);

    expect(result).toEqual({ id: gameId, userId, state: mockState });
    expect(mockPrisma.game.update).toHaveBeenCalledWith({
      where: { id: gameId },
      data: { state: mockState },
    });
  });

  it('should delete a game', async () => {
    mockPrisma.game.findFirst.mockResolvedValue({ id: gameId, userId, state: mockState });
    mockPrisma.game.delete.mockResolvedValue({ id: gameId, userId, state: mockState });

    const result = await service.remove(userId, gameId);
    expect(result).toEqual({ id: gameId, userId, state: mockState });
    expect(mockPrisma.game.delete).toHaveBeenCalledWith({ where: { id: gameId } });
  });
});
