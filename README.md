# poc-archiver-expo

Expo SDK Proof of concepts collection

![GitHub release (latest by date)](https://img.shields.io/github/v/release/amwebexpert/poc-archiver-expo) ![GitHub Release Date](https://img.shields.io/github/release-date/amwebexpert/poc-archiver-expo) ![GitHub last commit](https://img.shields.io/github/last-commit/amwebexpert/poc-archiver-expo) ![GitHub](https://img.shields.io/github/license/amwebexpert/poc-archiver-expo) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/amwebexpert/etoolbox/react) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/amwebexpert/etoolbox/typescript)


## Some screen captures

| Android Dark | iOS Dark | Android Light | iOS Light |
|--------------|----------|---------------|-----------|
| <img src="docs/captures/transformerjs-translation-en-de-screen-android.png" /> | <img src="docs/captures/transformerjs-translation-en-fr-screen-ios.png" /> | <img src="docs/captures/transformerjs-translation-en-fr-screen-android.png" /> | <img src="docs/captures/transformerjs-translation-en-de-screen-ios.png" /> |

## Project coding guidelines

Adhering to established coding guidelines is essential for developing efficient, maintainable, and scalable software. These guidelines promote consistency across codebases, making it easier for teams to collaborate and for new developers to understand existing code. By following standardized patterns, such as those outlined in the [Coding guidelines](https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md), developers can reduce errors and enhance code readability.

* [Coding guidelines](https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md)

## Scripts

| Command                              | Description                                                                     |
|--------------------------------------|---------------------------------------------------------------------------------|
| `yarn android`                       | Build & run the Expo project on an `Android` device or emulator.                |
| `yarn ios`                           | Build & run the Expo project on an `iOS` device or simulator.                   |
| `yarn start`                         | Start the `Expo` development server.                                            |
| `yarn lint`                          | Run linter to check for code style and formatting issues.                       |
| `yarn format`                        | Run linter to automatically fix code style and formatting issues.               |
| `yarn expo:doctor`                   | Run Expo's doctor command to diagnose issues in the project.                    |
| `yarn eas:build:ios:preview`         | Build `iOS` preview using EAS.                                                  |
| `yarn eas:build:ios:development`     | Build `iOS` development using EAS.                                              |
| `yarn eas:build:android:preview`     | Build `Android` preview using EAS.                                              |
| `yarn eas:build:android:development` | Build `Android` development using EAS.                                          |
| `yarn generate:version`              | Generate version infos (see `src/constants.ts`)                                 |
| `yarn eas:run:ios`                   | Run the latest `EAS iOS build`.                                                 |
| `yarn eas:run:android`               | Run the latest `EAS Android build`.                                             |
| `yarn postinstall`                   | Run `patch-package` and `npm-license-crawler` after dependencies are installed. |

## References

### Builds for iOS Simulator

- https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-emulatorsimulator
- https://docs.expo.dev/build-reference/simulators/#installing-build-on-the-simulator

### OTA updates on Android devices

`eas update --channel preview --platform android --message "OTA detail message here..."` 

### ONNX Runtime for RN (early access PR ref.)

- https://github.com/hans00/react-native-transformers-example
- https://github.com/huggingface/transformers.js/pull/118

