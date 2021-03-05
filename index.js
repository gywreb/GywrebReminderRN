/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { PushNotificationInit } from "./src/services/LocalPushController";

PushNotificationInit();

AppRegistry.registerComponent(appName, () => App);
