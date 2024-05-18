export interface IValueAttribute {
    id ?: number | string;
    attributeId : number;
    value : string;
    attribute : {
        name : string;
        description : string;
        id : number;
    }
}