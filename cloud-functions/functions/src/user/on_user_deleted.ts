import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onUserDeleted = functions
  .region('europe-west3')
  .auth.user()
  .onDelete(async (user) => {
    // Also delete the document of the user from firestore
    const userId = user.uid;
    const userRef = admin.firestore().collection('users').doc(userId);

    // first delete all subcollections
    const subcollections = await userRef.listCollections();
    subcollections.forEach(async (subcollection) => {
      const documents = await subcollection.get();
      documents.forEach((documentSnapshot) => {
        const documentReference = documentSnapshot.ref;
        try {
          documentReference.delete();
        } catch (e) {
          console.error(`Could not delete document ${documentReference}`);
        }
      });
    });

    // finally delete the user document itself
    await userRef.delete();

    // Delete all posts where user is author
    const documentsUserIsAuthor = await admin
      .firestore()
      .collection('posts')
      .where('authorId', '==', userId)
      .get();
    documentsUserIsAuthor.forEach((documentSnapshot) => {
      const documentReference = documentSnapshot.ref;
      try {
        documentReference.delete();
      } catch (e) {
        console.error(`Could not delete document ${documentReference}`);
      }
    });
  });
