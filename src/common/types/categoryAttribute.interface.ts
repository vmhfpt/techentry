export interface ICategoryAttribute {
    id ?: number | string;
    attribute : {
        id : number;
        name : string;
        description : string;
    };
    category : {
        id : number;
        name : string;
    };
    attributeId : number;
    categoryId : number | string;

}