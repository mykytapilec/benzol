import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from '../game.controller';
import { GameService } from '../game.service';
import { GameState } from '../game.types';
import { NotFoundException } from '@nestjs/common';
import { UpdateGameDto } from '../dto/update-game.dto';
import { CreateGameDto } from '../dto/create-game.dto';

describe('GameController', () => {
  let controller: GameController;
  let service: GameService;

  const mockState: GameState = {
    cells: [
      { id: 1, col: 0, row: 0, value: 2 },
      { id: 2, col: 1, row: 0, value: 4 },
    ],
    score: 6,
    isOver: false,
  };

  const mockGame = { id: 1, userId: 1, state: mockState };

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUser = { userId: 1 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [{ provide: GameService, useValue: mockService }],
    }).compile();

    controller = module.get<GameController>(GameController);
    service = module.get<GameService>(GameService);

    jest.clearAllMocks();
  });

  it('should create a game', async () => {
    mockService.create.mockResolvedValue(mockGame);
    const dto: CreateGameDto = { state: mockState };

    const result = await controller.create(mockUser, dto);
    expect(result).toEqual(mockGame);
    expect(mockService.create).toHaveBeenCalledWith(mockUser.userId, dto);
  });

  it('should get all games', async () => {
    mockService.findAll.mockResolvedValue([mockGame]);

    const result = await controller.findAll(mockUser);
    expect(result).toEqual([mockGame]);
    expect(mockService.findAll).toHaveBeenCalledWith(mockUser.userId);
  });

  it('should get one game', async () => {
    mockService.findOne.mockResolvedValue(mockGame);

    const result = await controller.findOne(mockUser, 1);
    expect(result).toEqual(mockGame);
    expect(mockService.findOne).toHaveBeenCalledWith(mockUser.userId, 1);
  });

  it('should throw NotFoundException when game not found', async () => {
    mockService.findOne.mockRejectedValue(new NotFoundException());

    await expect(controller.findOne(mockUser, 1)).rejects.toThrow(NotFoundException);
  });

  it('should update a game', async () => {
    const updateDto: UpdateGameDto = { state: mockState };
    mockService.update.mockResolvedValue(mockGame);

    const result = await controller.update(mockUser, 1, updateDto);
    expect(result).toEqual(mockGame);
    expect(mockService.update).toHaveBeenCalledWith(mockUser.userId, 1, updateDto);
  });

  it('should delete a game', async () => {
    mockService.remove.mockResolvedValue(mockGame);

    const result = await controller.remove(mockUser, 1);
    expect(result).toEqual(mockGame);
    expect(mockService.remove).toHaveBeenCalledWith(mockUser.userId, 1);
  });
});
