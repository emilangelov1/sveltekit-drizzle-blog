import { writable } from 'svelte/store';

type Notification = { message: string; type: 'success' | 'error' };

export const notifications = writable<Notification[]>([]);

export const addNotification = (message: string, type: 'success' | 'error') => {
	const notification = { message, type };
	notifications.update((notifs) => [...notifs, notification]);
	setTimeout(() => {
		removeNotification(notification);
	}, 3500);
};

function removeNotification(notification: Notification) {
	notifications.update((notifs) => notifs.filter((n) => n !== notification));
}
