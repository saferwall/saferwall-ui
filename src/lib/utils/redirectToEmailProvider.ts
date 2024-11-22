
export function redirectToEmailProvider(email: string) {
    const domain = email.split('@')[1];
    let providerLoginUrl = '';

    switch (domain) {
        case 'gmail.com':
            providerLoginUrl = 'https://mail.google.com/';
            break;
        case 'yahoo.com':
            providerLoginUrl = 'https://login.yahoo.com/';
            break;
        case 'outlook.com':
        case 'hotmail.com':
            providerLoginUrl = 'https://outlook.live.com/';
            break;
        default:
            providerLoginUrl = `https://www.${domain}`;
            break;
    }

    return providerLoginUrl;
}