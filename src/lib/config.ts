export const DEFAULT_PAGINATION_ITEMS = 20;

export const SESSION_KEY = 'session';

export enum UploadStatus {
	FAILED = -1,
	UPLOADING = 0,
	QUEUEING,
	PROCESSING,
	FINISHED,
}

export const FILE_UPLOAD_STATUS = [
	{
		title: 'Failed',
		value: UploadStatus.FAILED
	},
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
	},
];
