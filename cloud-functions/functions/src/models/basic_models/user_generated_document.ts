/* eslint-disable require-jsdoc */
import {UserInfo, UserInfoJsonInterface} from '../user';
import {dateFromJson} from '../utils/transformers';
import {
  GeneratedDocument,
  GeneratedDocumentJsonInterface,
} from './generated_document';

export interface UserGeneratedDocumentJsonInterface
  extends GeneratedDocumentJsonInterface {
  readonly author: UserInfoJsonInterface;
}

export class UserGeneratedDocument extends GeneratedDocument {
  constructor(
    id: string,
    creationTime: Date,
    public readonly author: UserInfo,
  ) {
    super(id, creationTime);
  }

  public static fromJson(
    json: UserGeneratedDocumentJsonInterface,
  ): UserGeneratedDocument {
    return new UserGeneratedDocument(
      json['id'],
      dateFromJson(json['creationTime']),
      UserInfo.fromJson(json['author']),
    );
  }

  toJson(): UserGeneratedDocumentJsonInterface {
    return {
      ...super.toJson(),
      author: this.author.toJson(),
    };
  }
}
