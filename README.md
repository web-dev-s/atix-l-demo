# atixlab demo Mobile

Source code for  react-native mobile app that handles storing csv and png files on mobile device Android and iOS
```
*
- Create a react native mobile app that allows the user to upload PNG files and CSV files, the 
app should have 3 screens (routes).
- There is no need for a backend, all data can make use of the device's local storage 
(anything asynchronous will work, it's not the most important part of the challenge).
*
- [x] `#0969DA` /home (where is possible to upload files)
Upload button
- [x] `#0969DA` /images (list of png files)
Gallery
 `#0969DA` /sheets (list of csv files)

*
On this list it should display the filename, and the total amount column 1 (Total)
When uploading csv the only format acceptable is, using line 1 as header (Total), and the 
rest as data, on the very first column. I.e.[^moment].

Total
100
20

The challenge is to use any package that you consider useful, the navigation is also up to 
you, you can make it using a drawer, tab bars, etc...
*
```
[^moment]:That spec is not realy clear for me therefore I implemented rendering csv as table. Challenge allocated maximum time was 48h (max 8/day=> at least 6 days), but I only had 14 available, therefore I did not had a lot of space for receiving answers. At this stage the project is in WIP status, but can be review-ed and checked the logics.

:+1: This challenge looks great - let's see some output! :shipit:
## Setup

### System requirements 
- [React Native](https://reactnative.dev/docs/environment-setup)
- [Watchman](https://facebook.github.io/watchman/docs/install/)
- [Yarn](https://yarnpkg.com/)

This project use **Yarn** as the Node.js package manager.

### Android requirements

1. Android Studio

```bash
brew cask install adoptopenjdk8
brew cask install android-studio 
```

Add the following _env_ vars to your system:

```bash
export ANDROID_HOME=/usr/local/share/android-sdk/
```

2. Android Platform Tools (adb)

```bash
brew cask install android-platform-tools
brew install bundletool
```

### iOS requirements

1. Xcode IDE.

```bash
brew cask install xcode
```

2. Xcode Command Line Tools

```bash
xcode-select --install
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

3. Accept Xcode licence

```bash
sudo xcodebuild -license accept
```

2. [Cocoapods](https://cocoapods.org/)

```bash
sudo gem install cocoapods
```

### Clone and install

1. Clone this repository.
2. Install dependencies:

```bash
yarn install
```
  
### Environment configuration

This project does noy use an `.env` file.

## Build & run

### Android

Please, refer to:

- How to [React Native app for Android](https://reactnative.dev/docs/environment-setup).

Commands:

- Build and install a **Debug** version:

```bash
yarn android
```

### iOS

Please, refer to:

- How to [React Native app for iOS](https://reactnative.dev/docs/environment-setup).

Commands:

- Build and install a **Debug** version:

```bash
yarn ios
```

## Release a new version not available yet


- Project does not contain at the moment a kestore for production releasec
 
## Project structure

The project's structure will look similar to this:

```
root
├── Gemfile
├── __tests__
│   ├── App-test.tsx
│   ├── Files-test.tsx
│   ├── Images-test.tsx
│   └── Upload-test.tsx
├── android
│   ├── app
│   ├── build
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── local.properties
│   └── settings.gradle
├── app.json
├── atixLabTestFiles
│   ├── csv
│   └── png
├── babel.config.js
├── index.js
├── ios
│   ├── Images.xcassets
│   ├── Podfile
│   ├── Podfile.lock
│   ├── Pods
│   ├── _xcode.env
│   ├── atixlabdemo
│   ├── atixlabdemo.xcodeproj
│   ├── atixlabdemo.xcworkspace
│   ├── atixlabdemoTests
│   └── build
├── metro.config.js
├── package.json
├── src
│   ├── App.tsx
│   ├── README.md
│   ├── assets
│   ├── components
│   ├── navigation.tsx
│   ├── screens
│   └── utils
├── tsconfig.json
├── yarn-error.log
└── yarn.lock

```
### ./atixLabTestFiles directory

Contains sample csv and png files for testing into read device in dev mode

### ./__tests__ directory

This directory will hold your Jest configs and mocks, as well as your test files. 

### ./androis directory

Android platform specific native project implementations. 

### ./ios directory

iOS platform specific native project implementations. 

### ./src directory

Included in an Ignite boilerplate project is the `src` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the src directory looks similar to the following:

```
src
├── App.tsx
├── README.md
├── assets
│   ├── chevron.png
│   ├── close.png
│   ├── close.svg
│   ├── csv.png
│   ├── index.ts
│   ├── menu.png
│   ├── png.png
│   └── upload.png
├── components
│   ├── RenderDocument.tsx
│   ├── RenderPickedFiles.tsx
│   ├── Screen.tsx
│   └── index.ts
├── navigation.tsx
├── screens
│   ├── files
│   │   ├── Files.tsx
│   │   └── files.style.ts
│   ├── images
│   │   ├── Images.tsx
│   │   └── images.style.ts
│   ├── index.ts
│   └── upload
│       ├── Upload.tsx
│       └── upload.styles.ts
└── utils
    ├── index.ts
    ├── transformers.ts
    └── types.ts
```

**components**
This is where reusable React components will live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like Button.

**screens**
This is where your screen components will be. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file with Recat component named export, along with a `.style.ts` file, with exported corespondent StyleSheet created and optionally `.presets`, and `.props` files for larger components.

**navigation**
This is where your `[React Navigation 6](https://reactnavigation.org/blog/2021/08/14/react-navigation-6.0/)` navigator declaration will reside.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, transformers, global used constants etc. are often found here. However, it should only be used for things that are truely shared across your application. For this specific use-case here is where all functions for write-read on device are declares. Also contains some global used types of common used objects
 


