export interface Iuser {
    id ?: number;
    address_line1 : string;
    address_line2 : string;
    district : string;
    email : string;
    image : {file : File};
    name : string;
    password : string;
    phone : string;
    city : string;
    role_id : string;
    country : string;
    upload ?: [File];
}