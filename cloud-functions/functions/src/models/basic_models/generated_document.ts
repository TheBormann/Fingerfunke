import {dateFromJson, dateToJson} from '../utils/transformers';
import {
  DatabaseDocumentJsonInterface,
  DatabaseDocument,
} from './database_document';

/* eslint-disable require-jsdoc */
export interface GeneratedDocumentJsonInterface
  extends DatabaseDocumentJsonInterface {
  readonly creationTime: number;
}

export class GeneratedDocument extends DatabaseDocument {
  constructor(id: string, public readonly creationTime: Date) {
    super(id);
  }

  public static fromJson(
    json: GeneratedDocumentJsonInterface,
  ): GeneratedDocument {
    return new GeneratedDocument(
      json['id'],
      dateFromJson(json['creationTime']),
    );
  }

  toJson(): GeneratedDocumentJsonInterface {
    return {
      ...super.toJson(),
      creationTime: dateToJson(this.creationTime),
    };
  }
}
