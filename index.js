/**
 * @format
 */
import 'react-native-get-random-values'
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import database from '@react-native-firebase/database';

database().setPersistenceEnabled(true);

AppRegistry.registerComponent(appName, () => App);
