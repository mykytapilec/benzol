import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from '../game.controller';
import { GameService } from '../game.service';
import { Direction } from '../game.types';

describe('GameController', () => {
  let controller: GameController;
  let service: GameService;

  const mockUser = { id: 1 };

  const mockGameService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        {
          provide: GameService,
          useValue: mockGameService,
        },
      ],
    }).compile();

    controller = module.get<GameController>(GameController);
    service = module.get<GameService>(GameService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create', async () => {
    const dto = {};
    await controller.create(mockUser as any, dto);
    expect(service.create).toHaveBeenCalledWith(mockUser.id, dto);
  });

  it('should call service.findAll', async () => {
    await controller.findAll(mockUser as any);
    expect(service.findAll).toHaveBeenCalledWith(mockUser.id);
  });

  it('should call service.findOne', async () => {
    await controller.findOne('42');
    expect(service.findOne).toHaveBeenCalledWith(42);
  });

  it('should call service.update (move)', async () => {
    const direction: Direction = Direction.LEFT;
    await controller.move('42', direction);
    expect(service.update).toHaveBeenCalledWith(42, direction);
  });

  it('should call service.remove', async () => {
    await controller.remove('42');
    expect(service.remove).toHaveBeenCalledWith(42);
  });
});
