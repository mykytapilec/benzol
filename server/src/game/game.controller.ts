import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('game')
@UseGuards(JwtAuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async create(@Req() req: Request, @Body() createGameDto: CreateGameDto) {
    const user = req.user as any;
    return this.gameService.create(user.sub, createGameDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const user = req.user as any;
    return this.gameService.findAll(user.sub);
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gameService.update(+id, updateGameDto);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    return this.gameService.remove(+id);
  }
}
