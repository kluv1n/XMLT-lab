"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmsService = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("../file.service");
let FilmsService = class FilmsService {
    fileService;
    constructor(fileService) {
        this.fileService = fileService;
    }
    findAll(title) {
        const film = this.fileService.read();
        if (title) {
            return film.filter((s) => s.title.toLowerCase().includes(title.toLowerCase()));
        }
        return film;
    }
    findOne(id) {
        const stock = this.fileService.read().find((s) => s.id === id);
        if (!stock) {
            throw new common_1.NotFoundException(`Карточка с id=${id} не найдена`);
        }
        return stock;
    }
    create(dto) {
        const film = this.fileService.read();
        if (film.some((s) => s.title === dto.title)) {
            throw new common_1.BadRequestException(`Карточка с title='${dto.title}' уже существует`);
        }
        const newId = film.length > 0 ? Math.max(...film.map((s) => s.id)) + 1 : 1;
        const stock = { ...dto, id: newId };
        this.fileService.add(stock);
        return stock;
    }
    update(id, dto) {
        const film = this.fileService.read();
        const idx = film.findIndex((s) => s.id === id);
        if (idx === -1) {
            throw new common_1.NotFoundException(`Карточка с id=${id} не найдена`);
        }
        const updated = { ...film[idx], ...dto };
        film[idx] = updated;
        this.fileService.write(film);
        return updated;
    }
    remove(id) {
        const film = this.fileService.read();
        const exists = film.some((s) => s.id === id);
        if (!exists) {
            throw new common_1.NotFoundException(`Карточка с id=${id} не найдена`);
        }
        this.fileService.write(film.filter((s) => s.id !== id));
    }
};
exports.FilmsService = FilmsService;
exports.FilmsService = FilmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FilmsService);
//# sourceMappingURL=film.service.js.map