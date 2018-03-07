import { Record } from "immutable";

export enum RoleType {
  Parent,
  Child,
}

export interface IRole {
  type: RoleType;
  name: string;
}

export const ORole: IRole = {
  type: RoleType.Parent,
  name: "",
};

export const RRole = Record<IRole>(ORole);

export class Role extends RRole {
}

export const parent = new Role({type: RoleType.Parent, name: "親"});
export const child = new Role({type: RoleType.Child, name: "子"});
