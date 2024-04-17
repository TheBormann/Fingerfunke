import {CopyableObject} from './copyable_object';

/* eslint-disable require-jsdoc */
export interface DatabaseDocumentJsonInterface {
  readonly id: string;
}

export class DatabaseDocument extends CopyableObject {
  constructor(public readonly id: string) {
    super();
  }

  public static fromJson(
    json: DatabaseDocumentJsonInterface,
  ): DatabaseDocument {
    return new DatabaseDocument(json['id']);
  }

  toJson(): DatabaseDocumentJsonInterface {
    return {
      id: this.id,
    };
  }
}
