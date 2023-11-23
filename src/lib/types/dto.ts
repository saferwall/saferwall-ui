export interface LoginDto {
	username: string;
	password: string;
}

export interface RegisterDto {
	email: string;
	username: string;
	password: string;
}

export interface ChangePasswordDto {
	guid: string;
	token: string;
	password: string;
}

export interface UpdateProfileDto {
	username: string;
	name: string;
	bio: string;
	location: string;
	url: string;
}

export interface UpdateEmailDto {
	username: string;
	email: string;
	password: string;
}

export interface UpdatePasswordDto {
	username: string;
	old: string;
	new_password: string;
}

export interface ApiTraceBufferDto {
	hash: string;
	guid: string;
	procName: string;
	pid: string;
	tid: string;
	buffId: string;
}
