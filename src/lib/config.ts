export const THEME_KEY = 'theme';
export const DEFAULT_PAGINATION_ITEMS = 20;

export const SESSION_KEY = 'session';
export const APP_VISITED_KEY = "hasVisitedAppBefore";

export enum UploadStatus {
	UPLOADING = 0,
	QUEUEING = 1,
	PROCESSING = 2,
	FINISHED = 3
}

export const FILE_UPLOAD_STATUS = [
	{
		title: 'Uploading',
		value: UploadStatus.UPLOADING
	},
	{
		title: 'Queueing',
		value: UploadStatus.QUEUEING
	},
	{
		title: 'Processing',
		value: UploadStatus.PROCESSING
	},
	{
		title: 'Finished',
		value: UploadStatus.FINISHED
	}
];
