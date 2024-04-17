# Fingerfunke Cloud Functions

## Who are we

## Getting started

**Note:** To help with the development flow some bash scripts are provided within this repo. Before using each script you must make it executable using `chmod -x <script>`

### Getting started with the local development setup / Emulator Suite

#### Some general Information

The following services will be run locally when the local environment is being used

1. Firestore
2. Cloud Functions
3. Authentification
4. Storage

##### Data Persistence

To save data between different sessions, the emulator can export and import data on start and respectively shutdown. Personally I (Tim Lindenau) decided for the following approach: Next to this directory there is a [second git repository](https://gitlab.com/fingerfunke/cloud-functions-data) only containing the emulator data. Before every run the most current data is pulled from this repo. Then the emulator runs its typical session. After the emulator has been shut down, all changes are committed and pushed to the repo. The process is automated via the `./scripts/start_emulator_tim.sh` file. Everyone is encouraged to be inspired by this solution. If you are part of the official team, please use the exact same approach with the same repo, this way all our changes are synced with one another.

#### Authentification

The Authentification process can also be emulated. For this however it is necessary to logout once on the device when switching between production and development environment. When using the local environment, after entering the phone number the validation code to be used is printed in the console of the cloud functions.

#### Hot Reloading

To automatically hot reload changes made to the cloud functions it is best to run ` npm run build -- --watch` from within the `./functions` directory parallel to the running emulator suite.

### How to use the local environment

#### Setup Cloudflare Tunnel
The cloud functions are dependent on webhooks working. Obviously, a cloud function cannot simply access the localhost of our device. Thus, we are required to use a `tunnel` which tunnels an external URL to our device. There are different tunnel services but I would recommend to use `Cloudflare tunnels`.

To setup cloudflare tunnels, please first make sure that you have an account by talking to Tim. After that follow the steps as generally explained [here](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/)
1. Download and install `cloudflare`, then authenticate your account
2. Create a tunnel for your device by running `cloudflared tunnel create <NAME>`
3. Create a configuration file `config.yaml` in the `.cloudflare` directory. The file should look like this:
```
url: http://localhost:5001
tunnel: <Tunnel-UUID>
credentials-file: <PATH_TO_CREDENTIALS_FILE>
```
4. Start routing traffic by running `cloudflared tunnel route dns <UUID or NAME of your tunnel> development.fingerfunke.app`
5. Run your tunnel via `cloudflared tunnel run <UUID or NAME of your tunnel>`

#### Install other dependencies
1. Install `firebase cli` using `npm install -g firebase-tools`
2. From within `./functions` run `npm install`

#### Activate Environment
Provide a valid `.env` file inside the `functions` directory. The `.env.example` file is a blueprintfor  how this file should look like. The proper configuration files can be found in [the private fingerfunke gitlab repo](https://gitlab.com/fingerfunke/config-files)

#### Start Emulator Suite
Make sure all previous steps have run sucessfully and that cloudflare tunnel is running. In one terminal compile the typescript code by running `npm run build --watch`. In another terminal start the firebase emulators by running `firebase emulators:start`. You can also play with some flags to import and store data. For example this could look like this `firebase emulators:start --import=<The location of the saved file> --export-on-exit`

### Deploy to Production

1. Provide a valid `.env` file at the root of the `/functions` directory. The `.env.example` file is a blueprint how this file should look like. A prebuilt configuration can be found in [the private fingerfunke gitlab repo](https://gitlab.com/fingerfunke/config-files)
2. Now you can deploy the functions in the standard way e.g. using `firebase deploy --only functions`. Preferably only depoly the functions you really changed

## Environment Variables

As stated before a valid environment variables file matching the blueprint in `.env.example` must be provided in the `functions` folder. Prebuilt configurations of these files are kept in a private fingerfunke gitlab-repo [here](https://gitlab.com/fingerfunke/config-files). If you are part of the team you should be able to just access them. If you are new and want to contribute to this project [please contact the team](mailto:info@fingerfunke.app) and we will give you access.


**List of all Environemt Variables**
|Variable|description|valid values|
|---|---|---|
|MUX_TOKEN_ID|Token Id as given by Mux| this is private|
|MUX_TOKEN_SECRET|Token secret as given by Mux| this is private|

# Releases

Releases are named using [semantic versioning](https://semver.org/lang/de/) in addition with the current build number. A valid release tag would therefore look something like this `v1.2.4+2`. Please `tag` every release in Git and add meaningful release notes

- Major release: A major release increments the first number. This is done when there are significant changes in the feature set of the App
- Minor Release: A minor release increments the second number. This is done when new functionality has been added to the App
- Patch release: A patch release increments the third number. This is done when only bugs have been fixed

The build number must automatically be incremented with every new release
