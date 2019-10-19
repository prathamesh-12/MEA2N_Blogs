export class Post {
    
    public title: string;
    public content: any;
    public id: any;

    constructor(title: string, content: any, id: any) {
        this.title = title;
        this.content = content;
        this.id = id;
    }
}