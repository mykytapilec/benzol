import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameState } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: {
        user: { connect: { id: userId } },
        state: createGameDto.state as unknown as object,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.game.findMany({
      where: { userId },
    });
  }

  async findOne(id: number) {
    const game = await this.prisma.game.findUnique({ where: { id } });
    if (!game) return null;

    const state = game.state ? (game.state as unknown as GameState) : undefined;
    return { ...game, state };
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    return this.prisma.game.update({
      where: { id },
      data: { state: updateGameDto.state as unknown as object },
    });
  }

  async remove(id: number) {
    return this.prisma.game.delete({ where: { id } });
  }

  async makeMove(id: number, moveData: any) {
    const game = await this.findOne(id);
    if (!game) throw new Error('Game not found');

    const state = game.state as GameState;
    const newScore = (state.score || 0) + 1;

    const newState = {
      ...state,
      score: newScore,
      isOver: newScore >= 10, // условное завершение игры
    };

    return this.update(id, { state: newState });
  }
}
