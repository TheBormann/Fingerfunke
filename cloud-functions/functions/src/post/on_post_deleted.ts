import * as functions from 'firebase-functions';
import {Post, PostJsonInterface} from '../models/post/post';
import { deleteAssetData } from '../models/assets/delete_asset';

export const onPostDelted = functions
  .region('europe-west3')
  .firestore.document('posts/{docId}')
  .onDelete(async (documentSnapshot) => {
    const post = Post.fromJson(documentSnapshot.data() as PostJsonInterface);

    // delete main asset
    await deleteAssetData(post.mainAsset);

    // delete all mux assets
    for (const asset of post.media) {
      await deleteAssetData(asset);
    }

    // Delete post_messages sub collection of post
    const postMessagesRef = documentSnapshot.ref.collection('post_messages');
    postMessagesRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        try {
          doc.ref.delete();
        } catch (e) {
          console.error(`Could not delete document ${doc.ref}`);
        }
      });
    });
  });
