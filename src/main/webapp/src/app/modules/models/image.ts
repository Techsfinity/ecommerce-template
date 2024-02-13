export class Image {
    url?: string;
    thumb?: string;
    broken?: boolean = false;
    loading?: boolean = true;
    name?: string;

    constructor(url?: string, loading?: boolean, name?: string) {
        this.url = url;
        this.loading = loading;
        this.name = name;
    }
}