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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let FileService = class FileService {
    filePath;
    constructor(filename = 'film.json') {
        this.filePath = (0, path_1.join)(process.cwd(), 'dist', filename);
        if (!(0, fs_1.existsSync)(this.filePath)) {
            (0, fs_1.writeFileSync)(this.filePath, '[]', 'utf-8');
        }
    }
    read() {
        try {
            const data = (0, fs_1.readFileSync)(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            throw new Error(`Failed to read file: ${error.message}`);
        }
    }
    add(item) {
        const data = this.read();
        if (Array.isArray(data)) {
            data.push(item);
            this.write(data);
        }
    }
    write(data) {
        (0, fs_1.writeFileSync)(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], FileService);
//# sourceMappingURL=file.service.js.map