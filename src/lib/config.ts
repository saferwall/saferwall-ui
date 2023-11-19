export const DEFAULT_PAGINATION_ITEMS = 20;

export const SESSION_KEY = 'session';

export enum UploadStatus {
	_START = 2,
	UPLOADING = 1,
	UPLOADED = 2,
	QUEUEING = 1 + UploadStatus._START,
	PROCESSING = 2 + UploadStatus._START,
	FINISHED = 3 + UploadStatus._START,
	READY = 4 + UploadStatus._START
}

export const FILE_UPLOAD_STATUS = [
	{
		title: 'Uploading',
		value: UploadStatus.UPLOADING
	},
	{
		title: 'Uploaded',
		value: UploadStatus.UPLOADED
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
	{
		title: 'Ready',
		value: UploadStatus.READY
	}
];
