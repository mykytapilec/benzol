import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: {
        userId,
        state: createGameDto.state,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.game.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(userId: number, gameId: number) {
    const game = await this.prisma.game.findFirst({
      where: { id: gameId, userId },
    });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async update(userId: number, gameId: number, updateGameDto: UpdateGameDto) {
    const game = await this.findOne(userId, gameId);
    return this.prisma.game.update({
      where: { id: game.id },
      data: { state: updateGameDto.state },
    });
  }

  async remove(userId: number, gameId: number) {
    const game = await this.findOne(userId, gameId);
    return this.prisma.game.delete({ where: { id: game.id } });
  }
}
