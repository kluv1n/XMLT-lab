import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmsService } from './film.service';
import { CreateFilmDto } from 'src/film/dto/create-film.dto';
import { UpdateFilmDto } from 'src/film/dto/update-film.dto';
import { Query } from '@nestjs/common';
import { Film } from 'src/film/entities/film.entity';

@Controller('film')
export class FilmController {

  constructor(private readonly filmService: FilmsService) {}

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.create(createFilmDto);
  }
  @Get()
  findAll(@Query('title') title?: string): Film[] {
    return this.filmService.findAll(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmService.remove(+id);
  }
}
