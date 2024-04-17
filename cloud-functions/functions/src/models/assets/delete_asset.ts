
import {Asset, AssetType, VideoAsset, FirebaseAsset, AssetState} from '../assets/asset';
import {deleteVideoAsset} from '../../mux/delete_video_asset';
import * as admin from 'firebase-admin';

/* eslint-disable require-jsdoc */
export async function deleteAssetData(asset: Asset){
    if(asset.state == AssetState.processing){
        return;
    }

    switch(asset.type){
        case AssetType.video: {
            // Delete Video in Mux
            const muxAssetId = (asset as VideoAsset).assetId;
            if(!muxAssetId){
                throw new Error("Could not delete Video at MUX because there was no valid Id");
            }
            await deleteVideoAsset(muxAssetId);
            break;
        }
        case AssetType.firebaseAsset: {
            // Delete File in Firebase Storage
            const path = (asset as FirebaseAsset).path;
            if(!path){
                throw new Error("Could not delete File in Firebase Storage because there was no valid Path");
            }
            await admin.storage().bucket().file(path).delete();
            break;
        }
        default: {
            throw new Error('Invalid Asset Type');
        }
    }
}