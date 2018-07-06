require('react-native-browser-polyfills');
const {
    Linking
} = require('react-native');
let newWindowMock = {
    closed: false
};

document.addEventListener('DOMContentLoaded', function () {
    if ('Accounts' in window) {
        Accounts._pollStoredLoginToken();
    }
})

Linking.addEventListener('url', event => {
    if (event.url.includes('://oauthHandler?')) {
        const query = event.url.split('://oauthHandler?')[1];
        const queryArr = query.split('&');
        const tokenQuery = queryArr[0];
        const secretQuery = queryArr[1];
        const tokenQueryArr = tokenQuery.split('=');
        const secretQueryArr = secretQuery.split('=');
        const credentialToken = tokenQueryArr[1];
        const credentialSecret = secretQueryArr[1];
        if (Package.oauth) {
            Package.oauth.OAuth._handleCredentialSecret(
                credentialToken, credentialSecret);
        }
        newWindowMock.closed = true;
    }
})

Object.defineProperty(window, 'open', {
    configurable: true,
    value: url => {
        newWindowMock.closed = false;
        Linking.openURL(url);
        return newWindowMock;
    }
});