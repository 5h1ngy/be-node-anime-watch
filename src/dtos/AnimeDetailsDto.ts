export class AnimeDetailsDto {
    id: string;
    type: string;
    image: string | null;

    constructor(id: string, type: string, image: string | null) {
        this.id = id;
        this.type = type;
        this.image = image;
    }
}
