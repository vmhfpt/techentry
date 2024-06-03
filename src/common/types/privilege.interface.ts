export interface IPrivilege {
    id ?: number | string;
    name : string;
    privilege_groupId : number;
    url_match : string;
    privilege_group ?: {
        name : string;
        id : number;
    }
} 