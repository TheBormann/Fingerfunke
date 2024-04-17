import * as functions from 'firebase-functions';
import {User} from '../models/user';
import {UserRepository} from '../repositories/user_repository/user_repository';

/**
 * Helper class to do Authentication tasks
 */
export default class Authenticator {
  /**
   * Check it the user making current request is an authenticated firebase user
   * meaning user has an account (annonymous or not)
   * @param {object} context context of clouf function
   * @throws Throws an error if user is not authenticated
   */
  public static checkForSignedIn(
    context: functions.https.CallableContext,
  ): void {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called while user is Signed in',
      );
    }
  }

  /**
   * Check if user making current request has user Account,
   * meaning they are a non anoynmous user
   * @param {object} context context of cloud function
   * @throws Throws an error if user is not authenticated or anonymous user
   */
  public static async checkUserHasAccount(
    context: functions.https.CallableContext,
  ): Promise<User> {
    this.checkForSignedIn(context);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return await new UserRepository().getUser(context.auth!.uid);
  }
}
