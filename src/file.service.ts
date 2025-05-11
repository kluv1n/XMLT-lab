import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService<T> {
  private readonly filePath: string;

  constructor(filename: string = 'film.json') {
    // Правильный путь без дублирования папки assets
    this.filePath = join(process.cwd(), 'dist', filename);
    
    // Создаем файл если не существует
    if (!existsSync(this.filePath)) {
      writeFileSync(this.filePath, '[]', 'utf-8');
    }
  }

  public read(): T {
    try {
      const data = readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data) as T;
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  public add(item: any): void {
    const data = this.read();
    if (Array.isArray(data)) {
      data.push(item);
      this.write(data);
    }
  }

  public write(data: T): void {
    writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}