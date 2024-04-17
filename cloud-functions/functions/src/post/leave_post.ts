/*

import * as functions from 'firebase-functions';
import Authenticator from '../services/authenticator';
import {PostRepository} from '../repositories/post_repository/post_repository';


export const leavePost = functions
  .region('europe-west3')
  .https.onCall(async (postId: string, context) => {
    const postRepository = new PostRepository();

    const user = await Authenticator.checkUserHasAccount(context);
    const post = await postRepository.getPost(postId);
    const updatedPost = post.removeParticipant(user);
    await postRepository.updatePost(updatedPost);

    return JSON.stringify(updatedPost.toJson());
  });

  */