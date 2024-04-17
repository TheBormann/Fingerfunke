import * as admin from 'firebase-admin';
import * as mux from './mux/index';
import * as post from './post/index';
import * as user from './user/index';
import * as temporaryAssets from './temporary_assets';

import 'dotenv/config';

admin.initializeApp();
admin.firestore().settings({ignoreUndefinedProperties: true});

export {mux, post, temporaryAssets, user};
