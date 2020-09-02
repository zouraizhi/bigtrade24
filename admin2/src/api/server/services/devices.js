import { ObjectID } from 'mongodb';
import { db } from '../lib/mongo';
import Expo from 'expo-server-sdk';
let expo = new Expo();

class DevicesService {
	constructor() {}

	addDeviceToken({ deviceToken }) {
		return new Promise((resolve, reject) => {
			if (deviceToken && deviceToken.length > 0) {
				db.collection('devices')
					.find({ deviceToken })
					.toArray()
					.then(items => {
						if (items == 0) {
							db.collection('devices')
								.insertMany([{ deviceToken }])
								.then(resolve)
								.catch(reject);
						} else {
							resolve({ message: 'Device token is existed.' });
						}
					})
					.catch(reject);
			} else {
				resolve({ message: 'Invalid device token' });
			}
		});
	}

	pushNotification({ title, body }) {
		return new Promise((resolve, reject) => {
			var messages = [];
			db.collection('devices')
				.find()
				.toArray()
				.then(items => {
					items.forEach(item => {
						if (Expo.isExpoPushToken(item.deviceToken)) {
							messages.push({
								to: item.deviceToken,
								sound: 'default',
								body,
								title,
								data: {}
							});
						}
					});

					messages.forEach(item => {
						let chunks = expo.chunkPushNotifications([item]);
						(async () => {
							for (let chunk of chunks) {
								try {
									let ticketChunk = await expo.sendPushNotificationsAsync(
										chunk
									);
									resolve(ticketChunk);
								} catch (error) {
									reject(error);
								}
							}
						})();
					});
				})
				.catch(reject);
		});
	}
}

export default new DevicesService();
