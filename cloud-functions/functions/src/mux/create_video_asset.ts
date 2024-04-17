import Mux from '@mux/mux-node';
import * as functions from 'firebase-functions';
import {v4 as uuidv4} from 'uuid';
import {AssetState, VideoAsset} from '../models/assets/asset';

import {TemporaryAssetsRepository} from '../repositories/temporary_assets_repository/temporary_assets_repository';

export const createMuxAsset = functions
  .region('europe-west3')
  .https.onCall(async () => {
    const {Video} = new Mux(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.MUX_TOKEN_ID!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.MUX_TOKEN_SECRET!,
    );

    const id = uuidv4();
    const upload = await Video.Uploads.create({
      cors_origin: '*',

      new_asset_settings: {
        passthrough: id,
        playback_policy: 'public',
      },
    });

    const asset = new VideoAsset(id, new Date(), AssetState.processing);

    await new TemporaryAssetsRepository().setAsset(id, asset);

    return {
      uploadUrl: upload.url,
      id: id,
    };
  });
