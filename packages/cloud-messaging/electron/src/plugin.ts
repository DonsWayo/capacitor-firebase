import { WebPlugin } from "@capacitor/core";
import { FirebaseCloudMessagingPlugin } from "./definitions";
import { TOKEN_UPDATED, NOTIFICATION_SERVICE_STARTED, START_NOTIFICATION_SERVICE, NOTIFICATION_SERVICE_ERROR, NOTIFICATION_RECEIVED } from './constants';
const { ipcMain } = require("electron");
const { register, listen } = require('push-receiver');
const Config = require('electron-config');


export class FirebaseCloudMessagingPluginWeb extends WebPlugin implements FirebaseCloudMessagingPlugin {

    conf: any;
    started = false;

    constructor() {
        super({
            name: "FirebaseCloudMessagingPlugin",
            platforms: ["electron"],
        });
        console.log("FirebaseCloudMessagingPlugin");
        this.conf = new Config();
    }

    //@ts-ignore
    subscribeToTopic(options: { name: string; }): Promise<{ message: string; }> {
        return new Promise((reject) => { reject({ message: "Not supported on Electron" }) });
    }

    //@ts-ignore
    unsubscribeFromTopic(options: { name: string; }): Promise<{ message: string; }> {
        return new Promise((reject) => { reject({ message: "Not supported on Electron" }) });
    }

    async echo(options: { value: string }): Promise<{ value: string }> {
        console.log('ECHO', options);
        return options;
    }

    //@ts-ignore
    initMessaging(key: string, webContents: any): void {
        // Will be called by the renderer process
        //@ts-ignore
        ipcMain.on(START_NOTIFICATION_SERVICE, async (_, senderId) => {
            // Retrieve saved credentials
            let credentials = this.conf.get('credentials');
            // Retrieve saved senderId
            const savedSenderId = this.conf.get('senderId');
            if (this.started) {
                webContents.send(NOTIFICATION_SERVICE_STARTED, (credentials.fcm || {}).token);
                return;
            }
            this.started = true;
            try {
                // Retrieve saved persistentId : avoid receiving all already received notifications on start
                const persistentIds = this.conf.get('persistentIds') || [];
                // Register if no credentials or if senderId has changed
                if (!credentials || savedSenderId !== senderId) {
                    credentials = await register(senderId);
                    // Save credentials for later use
                    this.conf.set('credentials', credentials);
                    // Save senderId
                    this.conf.set('senderId', senderId);
                    // Notify the renderer process that the FCM token has changed
                    webContents.send(TOKEN_UPDATED, credentials.fcm.token);
                }
                // Listen for GCM/FCM notifications
                await listen(Object.assign({}, credentials, { persistentIds }), this.onNotification(webContents));
                // Notify the renderer process that we are listening for notifications
                webContents.send(NOTIFICATION_SERVICE_STARTED, credentials.fcm.token);
            } catch (e) {
                console.error('PUSH_RECEIVER:::Error while starting the service', e);
                // Forward error to the renderer process
                webContents.send(NOTIFICATION_SERVICE_ERROR, e.message);
            }
        });
    }

    async getToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            const credentials = this.conf.get('credentials')
            if(credentials) {
                resolve(credentials.fcm.token)
            } else {
                reject('No token found')
            }
        });
    }

    onNotification(webContents: any) {
        //@ts-ignore
        return ({ notification, persistentId }) => {
            const persistentIds = this.conf.get('persistentIds') || [];
            // Update persistentId
            this.conf.set('persistentIds', [...persistentIds, persistentId]);
            // Notify the renderer process that a new notification has been received
            // And check if window is not destroyed for darwin Apps
            if (!webContents.isDestroyed()) {
                webContents.send(NOTIFICATION_RECEIVED, notification);
            }
        };
    }

}

const FirebaseCloudMessaging = new FirebaseCloudMessagingPluginWeb();

export { FirebaseCloudMessaging };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseCloudMessaging);