import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Direction, GameState } from './game.types';
import { Game } from './game';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createGameDto: CreateGameDto) {
    const gameInstance = new Game();
    const state = gameInstance.getState();

    return this.prisma.game.create({
      data: {
        userId,
        state,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.game.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const game = await this.prisma.game.findUnique({ where: { id } });
    if (!game) return null;
    return game;
  }

  async update(id: number, direction: Direction) {
    const gameData = await this.findOne(id);
    if (!gameData) return null;

    const gameInstance = new Game(gameData.state as GameState);
    gameInstance.move(direction);

    return this.prisma.game.update({
      where: { id },
      data: {
        state: gameInstance.getState(),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.game.delete({ where: { id } });
  }
}
