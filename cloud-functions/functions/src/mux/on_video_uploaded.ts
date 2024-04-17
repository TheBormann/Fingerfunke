import * as functions from 'firebase-functions';
import {AssetState, AssetType, VideoAsset} from '../models/assets/asset';
import {strict as assert} from 'assert';
import {TemporaryAssetsRepository} from '../repositories/temporary_assets_repository/temporary_assets_repository';
import * as sharp from 'sharp';
import axios from 'axios';

/**
 * Sleep function to wait for mux to process the video
 * @param {number} milliseconds
 * @return {Promise<unknown>}
 */
function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export const onMuxCallback = functions
  .region('europe-west3')
  .https.onRequest(async (req, res) => {
    const temporaryAssetsRepository = new TemporaryAssetsRepository();
    switch (req.method) {
      case 'POST': {
        const {type, data} = req.body;
        switch (type) {
          // Video asset finished processing
          case 'video.asset.created': {
            const id = data.passthrough;
            const assetId = data.id;
            const playbackId = data.playback_ids[0].id;
            console.log(
              `video with id ${id} and asset id ${assetId} successfully processed`,
            );
            
            // We have to wait some seconds here because otherwise the image is not ready yet
            // I dont quite understand why this is the case and we can definetly play with this value a bit
            await sleep(1000);

            // --------------------------------------------------------------------------------
            // Create thumbnail URL in low quality. This can be used by the application
            // to show a preview of the video before it is loaded

            // Get low resolution blurred version of video thumbnail to store in the asset
            const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
            console.log(thumbnailUrl);
            // Download image using axios
            const response = await axios.get(thumbnailUrl, {responseType: 'arraybuffer'});
            // Reduce the quality of the image
            const image = await sharp(response.data)
              .resize(100)
              .jpeg({quality: 10})
              .toBuffer();

            // create base64 data url
            const base64 = image.toString('base64');
            const dataUrl = `data:image/jpeg;base64,${base64}`;
            console.log(dataUrl);
            // --------------------------------------------------------------------------------

            // find video in temp collection
            const asset = await temporaryAssetsRepository.getAsset(id);
            assert(asset.type === AssetType.video);

            // update asset
            const updatedAsset = (asset as VideoAsset).copyWith({
              state: AssetState.ready,
              assetId: assetId,
              playbackId: playbackId,
              thumbnailUrl: dataUrl,
            });

            await temporaryAssetsRepository.updateAsset(updatedAsset);
          }
        }
        res.sendStatus(200);
        break;
      }
      default:
        res
          .status(400)
          .send({error: 'Only post requests are allowed at this endpoint'});
    }
  });
