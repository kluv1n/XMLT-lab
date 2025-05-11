import { FileService } from '../file.service';
import { Film } from 'src/film/entities/film.entity';
import { CreateFilmDto } from 'src/film/dto/create-film.dto';
import { UpdateFilmDto } from 'src/film/dto/update-film.dto';
export declare class FilmsService {
    private fileService;
    constructor(fileService: FileService<Film[]>);
    findAll(title?: string): Film[];
    findOne(id: number): Film;
    create(dto: CreateFilmDto): Film;
    update(id: number, dto: UpdateFilmDto): Film;
    remove(id: number): void;
}
