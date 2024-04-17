import * as functions from 'firebase-functions';

export const onTemporaryAssetDeleted = functions
  .region('europe-west3')
  .firestore.document('temporary_assets/{docId}')
   .onDelete(async (documentSnapshot)=> {
    throw new Error('Not implemented yet');

  //   const postRepository = new PostRepository();

  //   const asset = Asset.fromJson(documentSnapshot.data() as AssetJsonInterface);

  //   // if asset is already referenced in some document don't do anything just delete the temporary one
  //   const doesAnyPostContainAsset = await postRepository.doesAnyPostContainAsset(asset);

  //   if(doesAnyPostContainAsset){
  //     return ;
  //   }

  //   // handle different asset types differently
  //   switch(asset.type){
  //     case AssetType.video: {
  //       const videoAsset = asset as VideoAsset;
  //       if (videoAsset.assetId != null) {
  //         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //         deleteVideoAsset(videoAsset.assetId);
  //       } else {
  //         console.log(
  //           'Could not delete video asset because it did not have a valid asset Id',
  //         );
  //       }
  //       break;
  //     }
  //     case AssetType.image: {
  //       console.log('Deleting Image, no procedure implemented yet');
  //       break;
  //     }
  //     default:{
  //       console.error('Invalid Asset Type');
  //     }
  //   }
  });
