/* eslint-disable require-jsdoc */
import {
  GeneratedDocumentJsonInterface,
  GeneratedDocument,
} from '../basic_models/generated_document';
import {dateFromJson} from '../utils/transformers';

export enum AssetType {
  video = 'video',
  firebaseAsset = 'firebase_asset',
}

export enum AssetState {
  processing = 'processing',
  ready = 'ready',
}

class InvalidAssetTypeError extends Error {
  constructor() {
    super('Invalud Asset Type'); // (1)
    this.name = 'Invalid Asset Type Error'; // (2)
  }
}

export interface AssetJsonInterface extends GeneratedDocumentJsonInterface {
  readonly type: AssetType;
  readonly state: AssetState;
}

export class Asset extends GeneratedDocument {
  constructor(
    id: string,
    creationTime: Date,
    public readonly type: AssetType,
    public readonly state: AssetState,
  ) {
    super(id, creationTime);
  }

  public static fromJson(
    json: VideoAssetJsonInterface | FirebaseAssetJsonInterface,
  ): Asset {
    switch (AssetType[json['type'] as keyof typeof AssetType]) {
      case AssetType.video: {
        return VideoAsset.fromJson(json as VideoAssetJsonInterface);
      }
      case AssetType.firebaseAsset: {
        return FirebaseAsset.fromJson(json as FirebaseAssetJsonInterface);
      }
      default: {
        throw new InvalidAssetTypeError();
      }
    }
  }

  toJson(): VideoAssetJsonInterface | FirebaseAssetJsonInterface {
    if (this instanceof VideoAsset) {
      return (this as VideoAsset).toJson();
    } else if (this instanceof FirebaseAsset) {
      return (this as FirebaseAsset).toJson();
    } else {
      throw new InvalidAssetTypeError();
    }
  }

  protected toJsonHelper(): AssetJsonInterface {
    return {
      ...super.toJson(),
      type: this.type,
      state: this.state,
    };
  }
}


export enum MediaType {
  image = 'image',
  pdf = 'pdf',
}

export interface FirebaseAssetJsonInterface extends AssetJsonInterface {
  readonly downloadUrl?: string;
  readonly path: string;
  readonly mediaType: MediaType;
}

export class FirebaseAsset extends Asset {
  constructor(
    id: string,
    creationTime: Date,
    state: AssetState,
    public readonly path: string,
    public readonly mediaType: MediaType,
    public readonly downloadUrl?: string,
  ) {
    super(id, creationTime, AssetType.firebaseAsset, state);
  }

  // public static createImageAssetFromDownloadUrl(
  //   downloadUrl: string,
  // ): ImageAsset {
  //   const id = uuidv4();
  //   const date = new Date();
  //   const state = AssetState.ready;
  //   return new ImageAsset(id, date, state, downloadUrl);
  // }

  public static fromJson(json: FirebaseAssetJsonInterface): FirebaseAsset {
    return new FirebaseAsset(
      json['id'],
      dateFromJson(json['creationTime']),
      json['state'],
      json['path'],
      json['mediaType'],
      json['downloadUrl'],
    );
  }

  toJson(): FirebaseAssetJsonInterface {
    return {
      ...super.toJsonHelper(),
      path: this.path,
      mediaType: this.mediaType,
      downloadUrl: this.downloadUrl,
    };
  }
}

export interface VideoAssetJsonInterface extends AssetJsonInterface {
  readonly assetId?: string;
  readonly playbackId?: string;
  readonly thumbnailUrl?: string;
}
export class VideoAsset extends Asset {
  constructor(
    id: string,
    creationTime: Date,
    state: AssetState,
    public readonly assetId?: string,
    public readonly playbackId?: string,
    public readonly thumbnailUrl?: string,
  ) {
    super(id, creationTime, AssetType.video, state);
  }

  public static fromJson(json: VideoAssetJsonInterface): VideoAsset {
    return new VideoAsset(
      json['id'],
      dateFromJson(json['creationTime']),
      json['state'],
      json['assetId'],
      json['playbackId'],
      json['thumbnailUrl'],
    );
  }

  toJson(): VideoAssetJsonInterface {
    return {
      ...super.toJsonHelper(),
      assetId: this.assetId,
      playbackId: this.playbackId,
      thumbnailUrl: this.thumbnailUrl,
    };
  }
}
