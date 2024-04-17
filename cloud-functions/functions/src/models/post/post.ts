/* eslint-disable require-jsdoc */
import {Asset, AssetJsonInterface} from '../assets/asset';
import {
  UserGeneratedDocument,
  UserGeneratedDocumentJsonInterface,
} from '../basic_models/user_generated_document';
import {UserInfo} from '../user';
import {dateFromJson, dateToJson} from '../utils/transformers';

export enum PostType {
  event = 'event',
  recurrent = 'recurrent',
}

export enum PostVisibility {
  visible = 'visible',
  hidden = 'hidden',
}

interface Point {
  geohash: string;
  geopoint: Geopoint;
}

interface Geopoint {
  Latitude: number;
  Longitude: number;
}


class InvalidPostTypeError extends Error {
  constructor() {
    super('Invalud Post Type'); // (1)
    this.name = 'Invalid Post Type Error'; // (2)
  }
}

export interface PostJsonInterface extends UserGeneratedDocumentJsonInterface {
  type: PostType;
  title: string;
  description: string;
  visibility: PostVisibility;
  point: Point;
  media: AssetJsonInterface[];
  mainAsset: AssetJsonInterface;
}

export class Post extends UserGeneratedDocument {
  protected constructor(
    id: string,
    creationTime: Date,
    author: UserInfo,
    public type: PostType,
    public title: string,
    public description: string,
    public visibility: PostVisibility,
    public point: Point,
    public mainAsset: Asset,
    public media: Asset[],
  ) {
    super(id, creationTime, author);
  }

  public static fromJson(json: EventJsonInterface | GroupJsonInterface): Post {
    switch (PostType[json['type'] as keyof typeof PostType]) {
      case PostType.event: {
        return Event.fromJson(json as EventJsonInterface);
      }
      case PostType.recurrent: {
        return Group.fromJson(json as GroupJsonInterface);
      }
      default: {
        throw new InvalidPostTypeError();
      }
    }
  }

  toJson(): PostJsonInterface | GroupJsonInterface {
    if (this instanceof Event) {
      return (this as Event).toJson();
    } else if (this instanceof Group) {
      return (this as Group).toJson();
    } else {
      throw new InvalidPostTypeError();
    }
  }

  protected toJsonHelper(): PostJsonInterface {
    return {
      ...super.toJson(),
      type: this.type,
      title: this.title,
      description: this.description,
      visibility: this.visibility,
      point: this.point,
      mainAsset: this.mainAsset.toJson(),
      media: this.media.map((asset) => asset.toJson()),
    };
  }

  /*
  addParticipant(newUser: UserInfo): Post {
    // see if User is already member
    for (const user of participants) {
      if (user.id === newUser.id) {
        // User is already member just return post without changes
        // Todo we might want to throw an error, not sure
        return this;
      }
    }
    

    // if user is not already member, add user to list of participants
    participants.push(newUser);
    // !Das ist ein super ekelhafter fix aber aus irgendeinem Grund
    // kann man conpy with nicht von innerhalb aufrufen
    const updatedPostAsJson = {...this.toJson(), participants: participants};
    return Post.fromJson(updatedPostAsJson);
  }
  */

  /*
  removeParticipant(newUser: UserInfo): Post {
    const participants = this.participants;

    // ToDo do we want to throw an error if user is not participant of post before leaving
    const updatedParticipants = participants.filter(
      (user) => user.id != newUser.id,
    );

    // !Das ist ein super ekelhafter fix aber aus irgendeinem Grund
    // kann man conpy with nicht von innerhalb aufrufen
    const updatedPostAsJson = {
      ...this.toJson(),
      participants: updatedParticipants,
    };
    return Post.fromJson(updatedPostAsJson);
  }

  */
}


// ! Todo everything must be in one file due to circular imports

export interface EventJsonInterface extends PostJsonInterface {
  startTime: number;
}

export class Event extends Post {
  constructor(
    id: string,
    creationTime: Date,
    author: UserInfo,
    type: PostType,
    title: string,
    description: string,
    visibility: PostVisibility,
    point: Point,
    mainAsset: Asset,
    media: Asset[],
    public startTime: Date,
  ) {
    super(
      id,
      creationTime,
      author,
      type,
      title,
      description,
      visibility,
      point,
      mainAsset,
      media,
    );
  }

  public static fromJson(json: EventJsonInterface): Event {
    return new Event(
      json['id'],
      dateFromJson(json['creationTime']),
      UserInfo.fromJson(json['author']),
      json['type'],
      json['title'],
      json['description'],
      json['visibility'],
      json['point'],
      Asset.fromJson(json['mainAsset']),
      json['media'].map((asset) => Asset.fromJson(asset)),
      dateFromJson(json['startTime']),
    );
  }

  toJson(): EventJsonInterface {
    return {
      ...super.toJsonHelper(),
      startTime: dateToJson(this.startTime),
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GroupJsonInterface extends PostJsonInterface {}

export class Group extends Post {
  constructor(
    id: string,
    creationTime: Date,
    author: UserInfo,
    type: PostType,
    title: string,
    description: string,
    visibility: PostVisibility,
    point: Point,
    mainAsset: Asset,
    media: Asset[],
  ) {
    super(
      id,
      creationTime,
      author,
      type,
      title,
      description,
      visibility,
      point,
      mainAsset,
      media,
    );
  }

  public static fromJson(json: GroupJsonInterface): Group {
    return new Group(
      json['id'],
      dateFromJson(json['creationTime']),
      UserInfo.fromJson(json['author']),
      json['type'],
      json['title'],
      json['description'],
      json['visibility'],
      json['point'],
      Asset.fromJson(json['mainAsset']),
      json['media'].map((asset) => Asset.fromJson(asset)),
    );
  }

  toJson(): GroupJsonInterface {
    return {
      ...super.toJsonHelper(),
    };
  }
}
