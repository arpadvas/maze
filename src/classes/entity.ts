export class Entity {

    image: HTMLImageElement;
    sourceX: number;
    sourceY: number;
    swidth: number;
    sheight: number;
    x: number;
    y: number;
    width: number;
    height: number;
    acted: number;

    constructor(image: HTMLImageElement, sourceX: number, sourceY: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number, acted: number) {
        this.image = image;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.width = width;
        this.height = height;
        this.swidth = swidth;
        this.sheight = sheight;
        this.x = x;
        this.y = y;
        this.acted = acted;
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.sourceX, this.sourceY, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
    
    public acter() {
        this.acted = 1;
    }
}