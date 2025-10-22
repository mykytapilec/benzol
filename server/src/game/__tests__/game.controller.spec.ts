import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from '../game.controller';
import { GameService } from '../game.service';

describe('GameController', () => {
  let controller: GameController;
  let service: GameService;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on service', async () => {
    const dto = { state: { score: 0, cells: [], isOver: false } };
    const req = { user: { sub: 1 } } as any;
    await controller.create(req, dto);
    expect(service.create).toHaveBeenCalledWith(1, dto);
  });

  it('should call findAll on service', async () => {
    const req = { user: { sub: 1 } } as any;
    await controller.findAll(req);
    expect(service.findAll).toHaveBeenCalledWith(1);
  });

  it('should call findOne on service', async () => {
    await controller.findOne({} as any, '1');
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should call update on service', async () => {
    const dto = { state: { score: 10, cells: [], isOver: false } };
    await controller.update({} as any, '1', dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should call remove on service', async () => {
    await controller.remove({} as any, '1');
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
