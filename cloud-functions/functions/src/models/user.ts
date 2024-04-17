/* eslint-disable require-jsdoc */

import {
  DatabaseDocument,
  DatabaseDocumentJsonInterface,
} from './basic_models/database_document';

export interface UserInfoJsonInterface extends DatabaseDocumentJsonInterface {
  name: string;
  picture?: string;
}

export class UserInfo extends DatabaseDocument {
  constructor(id: string, public name: string, public picture?: string) {
    super(id);
  }

  public static fromJson(json: UserInfoJsonInterface): UserInfo {
    return new UserInfo(json['id'], json['name'], json['picture']);
  }

  toJson(): UserInfoJsonInterface {
    return {
      ...super.toJson(),
      name: this.name,
      picture: this.picture,
    };
  }
}

enum Gender {
  male = 'male',
  female = 'female',
  divers = 'divers',
}

export interface UserJsonInterface extends UserInfoJsonInterface {
  age?: number;
  gender?: Gender;
}
export class User extends UserInfo {
  constructor(
    id: string,
    name: string,
    picture?: string,
    public age?: number,
    public gender?: Gender,
  ) {
    super(id, name, picture);
  }

  public static fromJson(json: UserJsonInterface): User {
    return new User(
      json['id'],
      json['name'],
      json['picture'],
      json['age'],
      json['gender'],
    );
  }

  toJson(): UserJsonInterface {
    return {
      ...super.toJson(),
      name: this.name,
      picture: this.picture,
      age: this.age,
      gender: this.gender,
    };
  }
}
