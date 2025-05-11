import { Module } from '@nestjs/common';
import { FilmsService } from './film.service';
import { FilmController } from './film.controller';
import { FileService } from 'src/file.service';
import { Film } from 'src/film/entities/film.entity';

@Module({
  controllers: [FilmController],
  providers: [
    FilmsService,
    {
      provide: FileService,
      useFactory: () => new FileService<Film[]>('assets/film.json'),
    },
  ],
})
export class FilmsModule {}