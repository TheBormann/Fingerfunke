/* eslint-disable require-jsdoc */
import * as admin from 'firebase-admin';
import {Asset, AssetJsonInterface} from '../../models/assets/asset';

export class TemporaryAssetsRepository {
  private collectionReference = admin
    .firestore()
    .collection('temporary_assets');

  async getAsset(id: string): Promise<Asset> {
    const doc = await this.collectionReference.doc(id).get();

    if (doc.exists) {
      return Asset.fromJson(doc.data() as AssetJsonInterface);
    } else {
      throw new Error('Could not find asset with id: ' + id);
    }
  }

  setAsset(id: string, asset: Asset): Promise<FirebaseFirestore.WriteResult> {
    return this.collectionReference.doc(id).set(asset.toJson());
  }

  updateAsset(updatedAsset: Asset): Promise<FirebaseFirestore.WriteResult> {
    return this.collectionReference
      .doc(updatedAsset.id)
      .update({...updatedAsset.toJson()});
  }

  deleteAsset(asset: Asset): Promise<FirebaseFirestore.WriteResult> {
    return this.collectionReference.doc(asset.id).delete();
  }

  deleteAssetById(assetId: string): Promise<FirebaseFirestore.WriteResult> {
    return this.collectionReference.doc(assetId).delete();
  }

  async getAllAssetsCreatedBefore(timeLimit: number): Promise<Asset[]> {
    return (
      await this.collectionReference.where('creationTime', '<', timeLimit).get()
    ).docs.map((documentSnapshot) => {
      return Asset.fromJson(documentSnapshot.data() as AssetJsonInterface);
    });
  }
}
