/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */


import { ConfigStore } from './ConfigStore';
import { PowerStore } from './PowerStore';

const configStore = new ConfigStore();
const powerStore = new  PowerStore();


export { configStore, powerStore };

/*
*
*

rm -rf /Users/Rabbit/.jenkins/workspace/识兔/android/app/build
cd /Users/Rabbit/.jenkins/workspace/识兔


cd android && ./gradlew assembleRelease

rm -rf ${WORKSPACE}/android/app/build


cd ${WORKSPACE}


rm -rf ${WORKSPACE}/node_modules

/usr/local/bin/npm install

/usr/local/bin/npm run build


mkdir -p ${WORKSPACE}/android/app/src/main/assets/

/usr/local/bin/node ${WORKSPACE}/node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file ${WORKSPACE}/index.js --bundle-output ${WORKSPACE}/android/app/src/main/assets/index.android.bundle  --sourcemap-output ${WORKSPACE}/android/index.android.bundle.map --assets-dest ${WORKSPACE}/android/app/src/main/res/

rm -rf /Users/Rabbit/.jenkins/workspace/识兔/node_modules

/usr/local/bin/npm install

* */