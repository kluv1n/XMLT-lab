import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FileService } from '../file.service';
import { Film } from 'src/film/entities/film.entity';
import { CreateFilmDto } from 'src/film/dto/create-film.dto';
import { UpdateFilmDto } from 'src/film/dto/update-film.dto';

@Injectable()
export class FilmsService {
  constructor(private fileService: FileService<Film[]>) {}

  /** Получить все карточки, опционально отфильтровав по title */
  findAll(title?: string): Film[] {
    const film = this.fileService.read();

    if (title) {
      // регистронезависимый поиск по title
      return film.filter((s) =>
        s.title.toLowerCase().includes(title.toLowerCase()),
      );
    }
    return film;
  }

  /** Получить карточку по ID */
  findOne(id: number): Film {
    const stock = this.fileService.read().find((s) => s.id === id);
    if (!stock) {
      throw new NotFoundException(`Карточка с id=${id} не найдена`);
    }
    return stock;
  }

  /** Создать новую карточку */
  create(dto: CreateFilmDto): Film {
    const film = this.fileService.read();

    // проверим на дубликат по title
    if (film.some((s) => s.title === dto.title)) {
      throw new BadRequestException(
        `Карточка с title='${dto.title}' уже существует`,
      );
    }

    const newId = film.length > 0 ? Math.max(...film.map((s) => s.id)) + 1 : 1;
    const stock = { ...dto, id: newId };

    this.fileService.add(stock);
    return stock;
  }

  /** Обновить карточку */
  update(id: number, dto: UpdateFilmDto): Film {
    const film = this.fileService.read();
    const idx = film.findIndex((s) => s.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Карточка с id=${id} не найдена`);
    }

    const updated = { ...film[idx], ...dto };
    film[idx] = updated;
    this.fileService.write(film);
    return updated;
  }

  /** Удалить карточку */
  remove(id: number): void {
    const film = this.fileService.read();
    const exists = film.some((s) => s.id === id);

    if (!exists) {
      throw new NotFoundException(`Карточка с id=${id} не найдена`);
    }

    this.fileService.write(film.filter((s) => s.id !== id));
  }
}
