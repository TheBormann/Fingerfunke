/* eslint-disable require-jsdoc */
import * as admin from 'firebase-admin';
import {Asset} from '../../models/assets/asset';
import {Post, PostJsonInterface} from '../../models/post/post';

export class PostRepository {
  private collectionReference = admin.firestore().collection('posts');

  async getPost(id: string): Promise<Post> {
    const doc = await this.collectionReference.doc(id).get();

    if (doc.exists) {
      console.log(doc.data());
      // ToDo maybe there is a prettier cast
      return Post.fromJson(doc.data() as PostJsonInterface);
    } else {
      throw new Error('Could not find post with id: ' + id);
    }
  }

  updatePost(updatedPost: Post): Promise<FirebaseFirestore.WriteResult> {
    return this.collectionReference
      .doc(updatedPost.id)
      .update({...updatedPost.toJson()});
  }

  async doesAnyPostContainAsset(asset: Asset): Promise<boolean> {
    const docSnapshot = await this.collectionReference
      .where('media', 'array-contains', asset.toJson())
      .get();
    if (docSnapshot.size != 0) {
      return true;
    }
    return false;
  }
}
