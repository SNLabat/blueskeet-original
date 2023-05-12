# create-t3-turbo

<img width="1758" alt="turbo2" src="https://user-images.githubusercontent.com/51714798/213819392-33e50db9-3e38-4c51-9a22-03abe5e48f3d.png">

## Installation

There are two ways of initializing an app using `create-t3-turbo` starter. You can either use this repository as a template or use Turbo's CLI to init your project:
```bash
npx create-turbo@latest -e https://github.com/t3-oss/create-t3-turbo
```

## About

Ever wondered how to migrate your T3 application into a monorepo? Stop right here! This is the perfect starter repo to get you running with the perfect stack!

It uses [Turborepo](https://turborepo.org/) and contains:

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ expo
  |   ├─ Expo SDK 48
  |   ├─ React Native using React 18
  |   ├─ Navigation using Expo Router
  |   ├─ Tailwind using Nativewind
  |   └─ Typesafe API calls using tRPC
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 ├─ auth
     └─ authentication using next-auth. **NOTE: Only for Next.js app, not Expo**
 └─ db
     └─ typesafe db-calls using Prisma
```

> In this template, we use `@blueskeet` as a placeholder for package names. As a user, you might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@blueskeet/` to something like `@my-company/` / `@project-name/`.

## FAQ

### Can you include Solito?

No. Solito will not be included in this repo. It is a great tool if you want to share code between your Next.js and Expo app. However, the main purpose of this repo is not the integration between Next.js and Expo - it's the codesplitting of your T3 App into a monorepo, the Expo app is just a bonus example of how you can utilize the monorepo with multiple apps but can just as well be any app such as Vite, Electron, etc.

Integrating Solito into this repo isn't hard, and there are a few [offical templates](https://github.com/nandorojo/solito/tree/master/example-monorepos) by the creators of Solito that you can use as a reference.

### What auth solution should I use instead of Next-Auth.js for Expo?

I've left this kind of open for you to decide. Some options are [Clerk](https://clerk.dev), [Supabase Auth](https://supabase.com/docs/guides/auth), [Firebase Auth](https://firebase.google.com/docs/auth/) or [Auth0](https://auth0.com/docs). Note that if you're dropping the Expo app for something more "browser-like", you can still use Next-Auth.js for those. [See an example in a Plasmo Chrome Extension here](https://github.com/t3-oss/create-t3-turbo/tree/chrome/apps/chrome).

The Clerk.dev team even made an [official template repository](https://github.com/clerkinc/t3-turbo-and-clerk) integrating Clerk.dev with this repo.

During Launch Week 7, Supabase [announced their fork](https://supabase.com/blog/launch-week-7-community-highlights#t3-turbo-x-supabase) of this repo integrating it with their newly announced auth improvements. You can check it out [here](https://github.com/supabase-community/create-t3-turbo).

### Does this pattern leak backend code to my client applications?

No, it does not. The `api` package should only be a production dependency in the Next.js application where it's served. The Expo app, and all other apps you may add in the future, should only add the `api` package as a dev dependency. This lets you have full typesafety in your client applications, while keeping your backend code safe.

If you need to share runtime code between the client and server, such as input validation schemas, you can create a separate `shared` package for this and import on both sides.

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```diff
# Install dependencies
pnpm i

# In packages/db/prisma update schema.prisma provider to use sqlite
# or use your own database provider
- provider = "postgresql"
+ provider = "sqlite"

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Prisma schema to your database
pnpm db:push
```

### Configure Expo `dev`-script

#### Use iOS Simulator

1. Make sure you have XCode and XCommand Line Tools installed [as shown on expo docs](https://docs.expo.dev/workflow/ios-simulator/).
   > **NOTE:** If you just installed XCode, or if you have updated it, you need to open the simulator manually once. Run `npx expo start` in the root dir, and then enter `I` to launch Expo Go. After the manual launch, you can run `pnpm dev` in the root directory.

```diff
+  "dev": "expo start --ios",
```

3. Run `pnpm dev` at the project root folder.

> **TIP:** It might be easier to run each app in separate terminal windows so you get the logs from each app separately. This is also required if you want your terminals to be interactive, e.g. to access the Expo QR code. You can run `pnpm --filter expo dev` and `pnpm --filter nextjs dev` to run each app in a separate terminal window.

#### For Android

1. Install Android Studio tools [as shown on expo docs](https://docs.expo.dev/workflow/android-studio-emulator/).
2. Change the `dev` script at `apps/expo/package.json` to open the Android emulator.

```diff
+  "dev": "expo start --android",
```

3. Run `pnpm dev` at the project root folder.

## Deployment

### Next.js

#### Prerequisites

_We do not recommend deploying a SQLite database on serverless environments since the data wouldn't be persisted. I provisioned a quick Postgresql database on [Railway](https://railway.app), but you can of course use any other database provider. Make sure the prisma schema is updated to use the correct database._

**Please note that the Next.js application with tRPC must be deployed in order for the Expo app to communicate with the server in a production environment.**

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory and apply the following build settings:

<img width="927" alt="Vercel deployment settings" src="https://user-images.githubusercontent.com/11340449/201974887-b6403a32-5570-4ce6-b146-c486c0dbd244.png">

> The install command filters out the expo package and saves a few second (and cache size) of dependency installation. The build command makes us build the application using Turbo.

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.

### Expo

Deploying your Expo application works slightly differently compared to Next.js on the web. Instead of "deploying" your app online, you need to submit production builds of your app to the app stores, like [Apple App Store](https://www.apple.com/app-store/) and [Google Play](https://play.google.com/store/apps). You can read the full [Distributing your app](https://docs.expo.dev/distribution/introduction/), including best practices, in the Expo docs.

1. Make sure to modify the `getBaseUrl` function to point to your backend's production URL:

https://github.com/t3-oss/create-t3-turbo/blob/656965aff7db271e5e080242c4a3ce4dad5d25f8/apps/expo/src/utils/api.tsx#L20-L37

2. Let's start by setting up [EAS Build](https://docs.expo.dev/build/introduction/), which is short for Expo Application Services. The build service helps you create builds of your app, without requiring a full native development setup. The commands below are a summary of [Creating your first build](https://docs.expo.dev/build/setup/).

   ```bash
   // Install the EAS CLI
   $ pnpm add -g eas-cli

   // Log in with your Expo account
   $ eas login

   // Configure your Expo app
   $ cd apps/expo
   $ eas build:configure
   ```

3. After the initial setup, you can create your first build. You can build for Android and iOS platforms and use different [**eas.json** build profiles](https://docs.expo.dev/build-reference/eas-json/) to create production builds or development, or test builds. Let's make a production build for iOS.

   ```
   $ eas build --platform ios --profile production
   ```

   > If you don't specify the `--profile` flag, EAS uses the `production` profile by default.

4. Now that you have your first production build, you can submit this to the stores. [EAS Submit](https://docs.expo.dev/submit/introduction/) can help you send the build to the stores.

   ```
   $ eas submit --platform ios --latest
   ```

   > You can also combine build and submit in a single command, using `eas build ... --auto-submit`.

5. Before you can get your app in the hands of your users, you'll have to provide additional information to the app stores. This includes screenshots, app information, privacy policies, etc. _While still in preview_, [EAS Metadata](https://docs.expo.dev/eas/metadata/) can help you with most of this information.

6. Once everything is approved, your users can finally enjoy your app. Let's say you spotted a small typo; you'll have to create a new build, submit it to the stores, and wait for approval before you can resolve this issue. In these cases, you can use EAS Update to quickly send a small bugfix to your users without going through this long process. Let's start by setting up EAS Update.

   The steps below summarize the [Getting started with EAS Update](https://docs.expo.dev/eas-update/getting-started/#configure-your-project) guide.

   ```bash
   // Add the `expo-updates` library to your Expo app
   $ cd apps/expo
   $ pnpm expo install expo-updates

   // Configure EAS Update
   $ eas update:configure
   ```

7. Before we can send out updates to your app, you have to create a new build and submit it to the app stores. For every change that includes native APIs, you have to rebuild the app and submit the update to the app stores. See steps 2 and 3.

8. Now that everything is ready for updates, let's create a new update for `production` builds. With the `--auto` flag, EAS Update uses your current git branch name and commit message for this update. See [How EAS Update works](https://docs.expo.dev/eas-update/how-eas-update-works/#publishing-an-update) for more information.

   ```bash
   $ cd apps/expo
   $ eas update --auto
   ```

   > Your OTA (Over The Air) updates must always follow the app store's rules. You can't change your app's primary functionality without getting app store approval. But this is a fast way to update your app for minor changes and bug fixes.

9. Done! Now that you have created your production build, submitted it to the stores, and installed EAS Update, you are ready for anything!

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).

A [blog post](https://jumr.dev/blog/t3-turbo) where I wrote how to migrate a T3 app into this.

```
blueskeet
├─ .eslintrc.js
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ ORIG_HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ HEAD
│  │           └─ main
│  ├─ objects
│  │  ├─ 00
│  │  │  └─ f25e3dd91ed615ee525790c5d64e4aaea6345e
│  │  ├─ 01
│  │  │  ├─ 56f5c4b9a897f259ac3ceee09b68386961a9b0
│  │  │  └─ 573310c98248ba2cdde789e8f0e4370399156d
│  │  ├─ 02
│  │  │  └─ f947fa47fd4b89bd19c7e008c1401984d99b34
│  │  ├─ 09
│  │  │  └─ f6f9a689ae3d2fa06af49c354a2016347fe29a
│  │  ├─ 0b
│  │  │  ├─ 7cf3db71cf7f98da82c81f055a05e73b530833
│  │  │  └─ d4c48dff3b93e000d40272031b74d5baeac45a
│  │  ├─ 12
│  │  │  ├─ 12149999fbba7ee38e6472edd0e115f3224e6c
│  │  │  └─ 80a78ec3a41ecb627e5fa6c3db811b8ebd4b79
│  │  ├─ 15
│  │  │  └─ ce7f6680006dbcd223130bebb7dfbc77c028e2
│  │  ├─ 1d
│  │  │  └─ 90b24d9e8e30c588d1d3e9a660504101494689
│  │  ├─ 21
│  │  │  ├─ 1b4729b1e1556bc28b35f0b16f4af66f0bd32d
│  │  │  ├─ 87af4fc2f5e97fe49871a663224811ecd16c30
│  │  │  └─ f68405fd02fc7b101e3a165d5fcf624d42b427
│  │  ├─ 22
│  │  │  └─ 6bbe7a1e9d034345dc6270b2773c3f4e73154c
│  │  ├─ 24
│  │  │  └─ dcfa23e599404b6e393c71a88a6a5360f0bcc9
│  │  ├─ 27
│  │  │  └─ a1db8dc0aaa192d986c112f6b6591c7aa4b501
│  │  ├─ 31
│  │  │  └─ d6622da25ed34d09c0adc3ec9b257f118edae5
│  │  ├─ 35
│  │  │  └─ 9159d44a61efb70f36de2ede1be763c1124ad1
│  │  ├─ 37
│  │  │  └─ c29633a46889171f4093aad6135b4fcbd35ec9
│  │  ├─ 3c
│  │  │  └─ 25c52b40f33e1ae8f98b955c1010fa60b810bb
│  │  ├─ 42
│  │  │  └─ 793d238b623ff072eb0515d0066817fec951fd
│  │  ├─ 46
│  │  │  ├─ 72e9a936e5a576af108df94ad76e354238c8ea
│  │  │  └─ dbb393283d78a6fdbebc6d8cda53f66c50a09d
│  │  ├─ 48
│  │  │  └─ d0081705a4bf6a79c94de22c8399635b3c44fd
│  │  ├─ 4a
│  │  │  └─ f8072092c4736b9f92aee1a67946fef6280837
│  │  ├─ 4b
│  │  │  └─ afa36f949c91fb0802ef5fc373754c1775ece5
│  │  ├─ 51
│  │  │  └─ 4da67494cb191dd67bc3903cb979501757dbe3
│  │  ├─ 53
│  │  │  └─ ec2f92d182c3eb30fd248d26b607c62648fc9c
│  │  ├─ 5b
│  │  │  ├─ 1a82a07cf34d8a484cd2c48d16b8a8a37e27a2
│  │  │  └─ 5ef01a0dfdd7ae41aa9bac7c76be67048833c6
│  │  ├─ 60
│  │  │  └─ 4d9050254ad660c647c5f0672931a339763821
│  │  ├─ 62
│  │  │  └─ 0765380ae72499efc728b51e87d8943ed25d32
│  │  ├─ 63
│  │  │  └─ fce946167d6a53ae55588693b7a17711c53d86
│  │  ├─ 6a
│  │  │  └─ 03ff5aded24389be09205353c289a309b7434b
│  │  ├─ 6b
│  │  │  └─ fa5f3382eceafa9a6fe471e5e8a19e7772b0b0
│  │  ├─ 6e
│  │  │  └─ 5877a7d9e531d887d97e76dab7ad94edc69bad
│  │  ├─ 77
│  │  │  └─ 3f9146ce7d129f60a5b1e8c790a55c5da9489f
│  │  ├─ 79
│  │  │  └─ ad301b27bc8aa8432fc55f7056b0d5267acfaa
│  │  ├─ 80
│  │  │  ├─ 2747f96837cbd56666cff9c1637a452baafadf
│  │  │  └─ fecd1d4ee4f76951a59d1b18b4e220f45c7054
│  │  ├─ 82
│  │  │  └─ 3d2f1aaae6a6f82a896ef7a032f80797f86e05
│  │  ├─ 83
│  │  │  └─ 6cae044b988fac4dd3d4bacf7a0f081a53d3a4
│  │  ├─ 8b
│  │  │  └─ 2b46a990a7760378f24ef760f774f91f1cec58
│  │  ├─ 8f
│  │  │  └─ f1cfd9d50db4f4991be32c453688d20582e24a
│  │  ├─ 91
│  │  │  └─ 8505292b0f49e0edc0680e4ff86126753f7096
│  │  ├─ 92
│  │  │  └─ 828cd58107ca8e53b499214cd7a51852e673ad
│  │  ├─ 99
│  │  │  └─ 0f50e57092dbf11167200e2632420b99f8b412
│  │  ├─ 9b
│  │  │  └─ 5a2f377838a2a5d7992eeaba1e42b074474b0a
│  │  ├─ a1
│  │  │  └─ 90efb07a5dc595e91f97ba49c798068c295a97
│  │  ├─ aa
│  │  │  ├─ 1112fe230a02d245732504bf15bec3c68a8ab2
│  │  │  └─ b0b96716b27b7e62ad90a6a5f0174249b8f01a
│  │  ├─ af
│  │  │  └─ 170f378cc13017ee7ddc61ecda9a91d8b2da89
│  │  ├─ b3
│  │  │  └─ 482564ff4b7d2e76849632e7c73b106265a655
│  │  ├─ b6
│  │  │  ├─ d1e7038bb22042b93f8eef6f8576b2b3f899e9
│  │  │  └─ ff63603e7e317d0798044089bff2bf7227811a
│  │  ├─ b7
│  │  │  ├─ 79cdf1f457bc3784f653bb4a2ad7d9829846eb
│  │  │  └─ 96e306b6b49ca28c014fa1e40ef52dc905c67f
│  │  ├─ b9
│  │  │  └─ 3cf823a86e967e2e48f8d49a0cce964d7c333e
│  │  ├─ bf
│  │  │  └─ b92f58682b0c08f80935f4118d335c87cc0fcd
│  │  ├─ c5
│  │  │  └─ 88cfc49469ea90fd1871cda6a22dee1d0805b4
│  │  ├─ c6
│  │  │  └─ 58ab2741c2c28238d659d5c5c2989b6b20c822
│  │  ├─ c7
│  │  │  └─ 24956b96b4459fb8ad396fdd811383f21388b4
│  │  ├─ c8
│  │  │  └─ 9f879db11dbbf3a578e960a149a87dc5a4a1a0
│  │  ├─ cb
│  │  │  └─ bd02239e7ec9df46cb5ad2c17ef45a2d4f09c6
│  │  ├─ cc
│  │  │  └─ 4f4b9b58b7ac7054ff93976b6347b2262b2505
│  │  ├─ d0
│  │  │  └─ a058f46fafc34531123e5041bd18795dcddefa
│  │  ├─ d3
│  │  │  └─ ea13213167b0cd7f9d192705492e4f8bb462ba
│  │  ├─ dc
│  │  │  └─ e3797e95aa60215c51ccf0d8bfba42349746f1
│  │  ├─ e1
│  │  │  ├─ 93afd5a2bc59ce968734366b351ca0bebbea59
│  │  │  └─ d0855d54642ce3b69caece5fb6f3ab1ece2b20
│  │  ├─ e9
│  │  │  └─ f121d5ea58baad7aba7e643f0812587fbd4432
│  │  ├─ ed
│  │  │  └─ c5aef0072cc2451a73ae09a1f6fb5a299500aa
│  │  ├─ f2
│  │  │  └─ fbb76603021723469ee14a721fd57924c9a2fa
│  │  ├─ f3
│  │  │  └─ ff39346075b668110a265df51effc700deb8d2
│  │  ├─ f6
│  │  │  └─ b667d9cc138015eefb39a2da84daa052661ab6
│  │  ├─ f7
│  │  │  └─ 0c350c47923a6bedc494a212ea33d7eaf40d3f
│  │  ├─ f9
│  │  │  └─ d48e913e87ed7bb249951cf22c565293afe2b7
│  │  ├─ fb
│  │  │  └─ 91e2f737728fc75b5491ef7e786a7c20064f6e
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-a5c989835a8d72bf51dbfeefbee06f2f68b4b8a8.idx
│  │     └─ pack-a5c989835a8d72bf51dbfeefbee06f2f68b4b8a8.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ HEAD
│     │     └─ main
│     └─ tags
├─ .github
│  ├─ FUNDING.yml
│  ├─ ISSUE_TEMPLATE
│  │  ├─ bug_report.yml
│  │  └─ feature_request.yml
│  └─ workflows
│     └─ ci.yml
├─ .gitignore
├─ .npmrc
├─ .nvmrc
├─ .vscode
│  ├─ extensions.json
│  ├─ launch.json
│  └─ settings.json
├─ LICENSE
├─ README.md
├─ apps
│  ├─ expo
│  │  ├─ .expo-shared
│  │  │  └─ assets.json
│  │  ├─ app.config.ts
│  │  ├─ assets
│  │  │  ├─ blueskeet.png
│  │  │  └─ icon.png
│  │  ├─ babel.config.js
│  │  ├─ blueskeet
│  │  │  ├─ .gitignore
│  │  │  ├─ App.js
│  │  │  ├─ app.json
│  │  │  ├─ assets
│  │  │  │  ├─ adaptive-icon.png
│  │  │  │  ├─ favicon.png
│  │  │  │  ├─ icon.png
│  │  │  │  └─ splash.png
│  │  │  ├─ babel.config.js
│  │  │  ├─ package-lock.json
│  │  │  └─ package.json
│  │  ├─ eas.json
│  │  ├─ expo-plugins
│  │  │  └─ with-modify-gradle.js
│  │  ├─ index.js
│  │  ├─ metro.config.js
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ _layout.tsx
│  │  │  ├─ app
│  │  │  │  ├─ (auth)
│  │  │  │  │  └─ login.tsx
│  │  │  │  ├─ (tabs)
│  │  │  │  │  ├─ _layout.tsx
│  │  │  │  │  ├─ notifications.tsx
│  │  │  │  │  ├─ profile.tsx
│  │  │  │  │  ├─ search.tsx
│  │  │  │  │  └─ skyline.tsx
│  │  │  │  ├─ _layout.tsx
│  │  │  │  ├─ images
│  │  │  │  │  └─ [post].tsx
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ profile
│  │  │  │  │  └─ [handle]
│  │  │  │  │     ├─ index.tsx
│  │  │  │  │     └─ post
│  │  │  │  │        └─ [id].tsx
│  │  │  │  └─ settings
│  │  │  │     └─ index.tsx
│  │  │  ├─ components
│  │  │  │  ├─ actor-details.tsx
│  │  │  │  ├─ avatar.tsx
│  │  │  │  ├─ button.tsx
│  │  │  │  ├─ compose-button.tsx
│  │  │  │  ├─ composer.tsx
│  │  │  │  ├─ drawer-content.tsx
│  │  │  │  ├─ embed.tsx
│  │  │  │  ├─ feed-post.tsx
│  │  │  │  ├─ image-viewer.tsx
│  │  │  │  ├─ invite-codes.tsx
│  │  │  │  ├─ post.tsx
│  │  │  │  ├─ profile-info.tsx
│  │  │  │  ├─ profile-view.tsx
│  │  │  │  ├─ query-without-data.tsx
│  │  │  │  ├─ rich-text.tsx
│  │  │  │  └─ tabs.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ lib
│  │  │     ├─ agent.ts
│  │  │     ├─ bottom-sheet.ts
│  │  │     ├─ hooks.ts
│  │  │     ├─ locale.ts
│  │  │     ├─ log-out-context.tsx
│  │  │     ├─ query-client.ts
│  │  │     └─ utils
│  │  │        ├─ api.tsx
│  │  │        ├─ assert.ts
│  │  │        ├─ cx.ts
│  │  │        ├─ polyfills
│  │  │        │  ├─ fetch-polyfill.ts
│  │  │        │  └─ platform-polyfills.ts
│  │  │        ├─ query.ts
│  │  │        └─ time.ts
│  │  ├─ tailwind.config.js
│  │  └─ tsconfig.json
│  └─ nextjs
│     ├─ README.md
│     ├─ next.config.mjs
│     ├─ package.json
│     ├─ postcss.config.cjs
│     ├─ public
│     │  ├─ blueskeet.png
│     │  ├─ favicon.ico
│     │  └─ t3-icon.svg
│     ├─ src
│     │  ├─ app
│     │  │  ├─ email-input.tsx
│     │  │  ├─ layout.tsx
│     │  │  ├─ page.tsx
│     │  │  ├─ privacy-policy
│     │  │  │  └─ page.tsx
│     │  │  ├─ providers.tsx
│     │  │  └─ waitlist
│     │  │     └─ route.ts
│     │  ├─ assets
│     │  │  └─ blueskeet.png
│     │  ├─ env.mjs
│     │  ├─ pages
│     │  │  └─ api
│     │  │     └─ trpc
│     │  │        └─ [trpc].ts
│     │  ├─ styles
│     │  │  └─ globals.css
│     │  └─ utils
│     │     └─ api.ts
│     ├─ tailwind.config.ts
│     └─ tsconfig.json
├─ package-lock.json
├─ package.json
├─ packages
│  ├─ api
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ root.ts
│  │  │  ├─ router
│  │  │  │  ├─ auth.ts
│  │  │  │  └─ post.ts
│  │  │  └─ trpc.ts
│  │  └─ tsconfig.json
│  ├─ auth
│  │  ├─ env.mjs
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ auth-options.ts
│  │  │  └─ get-session.ts
│  │  └─ tsconfig.json
│  ├─ config
│  │  ├─ eslint
│  │  │  ├─ index.js
│  │  │  └─ package.json
│  │  └─ tailwind
│  │     ├─ index.ts
│  │     ├─ package.json
│  │     └─ postcss.js
│  └─ db
│     ├─ index.ts
│     ├─ package.json
│     ├─ prisma
│     │  └─ schema.prisma
│     └─ tsconfig.json
├─ pnpm-workspace.yaml
├─ prettier.config.cjs
├─ renovate.json
├─ tsconfig.json
├─ turbo.json
├─ vercel.json
└─ yarn.lock

```