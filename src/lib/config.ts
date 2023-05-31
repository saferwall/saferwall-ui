export const SESSION_KEY = 'session';

export enum UploadStatus {
    _START = 2,
    UPLOADING = 0,
    UPLOADED = 1,
    QUEUEING = 0 + UploadStatus._START,
    PROCESSING = 1 + UploadStatus._START,
    FINISHED = 2 + UploadStatus._START,
    READY = 3 + UploadStatus._START,
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
    },
];