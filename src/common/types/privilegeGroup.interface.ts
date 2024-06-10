import { IPrivilege } from "./privilege.interface";

export interface IPrivilegeGroup {
   id ?: number;
   name : string;
   privileges ?: IPrivilege[];
}