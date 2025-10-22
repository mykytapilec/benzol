import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Direction } from './game.types';
import { User } from '../user/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@User() user: any, @Body() createGameDto: CreateGameDto) {
    if (!user || !user.id) {
      throw new BadRequestException('User not found in request');
    }
    return this.gameService.create(user.id, createGameDto);
  }

  @Get()
  findAll(@User() user: any) {
    if (!user || !user.id) {
      throw new BadRequestException('User not found in request');
    }
    return this.gameService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(Number(id));
  }

  @Patch(':id/move')
  move(@Param('id') id: string, @Body('direction') direction: Direction) {
    return this.gameService.update(Number(id), direction);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(Number(id));
  }
}
