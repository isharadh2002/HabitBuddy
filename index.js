/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App_Original from './App_Original';
import {name as appName} from './app.json';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
