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
  get isChild() {
    return this.type === RoleType.Child;
  }

  get isParent() {
    return !this.isChild;
  }

  static get Parent() {
    return new Role({type: RoleType.Parent, name: "親"});
  }

  static get Child() {
    return new Role({type: RoleType.Child, name: "子"});
  }
}
