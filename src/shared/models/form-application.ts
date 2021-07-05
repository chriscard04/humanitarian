export class Education {
    e_degree: string;
    e_title: string;
    e_year: number;

    constructor(ed){
        this.e_degree = ed.e_degree || "";
        this.e_title = ed.e_title || "";
        this.e_year = ed.e_year || 0;
    }
}