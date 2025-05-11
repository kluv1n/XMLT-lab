import { FilmsService } from './film.service';
import { CreateFilmDto } from 'src/film/dto/create-film.dto';
import { UpdateFilmDto } from 'src/film/dto/update-film.dto';
import { Film } from 'src/film/entities/film.entity';
export declare class FilmController {
    private readonly filmService;
    constructor(filmService: FilmsService);
    create(createFilmDto: CreateFilmDto): Film;
    findAll(title?: string): Film[];
    findOne(id: string): Film;
    update(id: string, updateFilmDto: UpdateFilmDto): Film;
    remove(id: string): void;
}
