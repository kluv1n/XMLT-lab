export declare class FileService<T> {
    private readonly filePath;
    constructor(filename?: string);
    read(): T;
    add(item: any): void;
    write(data: T): void;
}
