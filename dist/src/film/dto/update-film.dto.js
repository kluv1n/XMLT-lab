"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFilmDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_film_dto_1 = require("./create-film.dto");
class UpdateFilmDto extends (0, mapped_types_1.PartialType)(create_film_dto_1.CreateFilmDto) {
}
exports.UpdateFilmDto = UpdateFilmDto;
//# sourceMappingURL=update-film.dto.js.map