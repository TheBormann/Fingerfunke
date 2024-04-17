import * as functions from 'firebase-functions';
import {TemporaryAssetsRepository} from '../repositories/temporary_assets_repository/temporary_assets_repository';
import { deleteAssetData } from '../models/assets/delete_asset';

// delete all temporary assets older than a day
// must be number in seconds
const deleteAssetsOlderThan = 86400;

export const scheduledCleanup = functions
  .region('europe-west3')
  .pubsub.schedule('every 24 hours')
  .onRun(async () => {
    console.log('Starting Clenaup of Temporary Assets');
    let deletedObjectCounter = 0;

    const temporaryAssetsRepository = new TemporaryAssetsRepository();
    const ageLimit = Date.now() - deleteAssetsOlderThan * 1000;
    // get all objects in temporary collection
    const temporaryAssetsToBeDeleted =
      await temporaryAssetsRepository.getAllAssetsCreatedBefore(ageLimit);

    // delet all assets
    // should be such a loop because for each does not wait for async operations
    for (const assetToBeDeleted of temporaryAssetsToBeDeleted) {
      try {
        
        // first delete underlying data
        deleteAssetData(assetToBeDeleted);
        // then remove document as well
        await temporaryAssetsRepository.deleteAsset(assetToBeDeleted);
        deletedObjectCounter++;
      } catch (err) {
        console.error(
          `could not delete temporary asset with id ${assetToBeDeleted.id}`,
        );
      }
    }

    console.log(`Cleanup finished, deleted ${deletedObjectCounter} elements`);
  });
