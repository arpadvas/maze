export abstract class Entity {

    public image: HTMLImageElement;
    public sourceX: number;
    public sourceY: number;
    public swidth: number;
    public sheight: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(image: HTMLImageElement, sourceX: number, sourceY: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number) {
        this.image = image;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.width = width;
        this.height = height;
        this.swidth = swidth;
        this.sheight = sheight;
        this.x = x;
        this.y = y;
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.sourceX, this.sourceY, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }

}