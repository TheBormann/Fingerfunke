/* eslint-disable require-jsdoc */
import axios, {AxiosError} from 'axios';


export async function deleteVideoAsset(assetId: string): Promise<void> {
  const assetUrl = `https://api.mux.com/video/v1/assets/${assetId}`
  try {
    await axios.delete(assetUrl, {
      auth: {

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        username:  process.env.MUX_TOKEN_ID!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        password: process.env.MUX_TOKEN_SECRET!
      },
    });
  } catch (e) {
    console.error('Could not delete Video Asset on Mux, status Code');
    if (e instanceof AxiosError) {
      console.error('Axios has thrown error Code:' + e.code);
    }
  }
}
