/* eslint-disable require-jsdoc */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {User, UserJsonInterface} from '../../models/user';

export class UserRepository {
  /**
   * return full user document from id
   * @param {String} userId  id of user
   */
  async getUser(userId: string): Promise<User> {
    console.log(`getUser ${userId}`);
    const userDoc = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .get();

    if (userDoc.exists) {
      return User.fromJson(userDoc.data() as UserJsonInterface);
    } else {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'User Account does not exist',
      );
    }
  }
}
