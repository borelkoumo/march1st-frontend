const o = {
  "sessionId": "44a2a1d7-dba7-4aa1-8761-c5e9fc6fcf4d",
  "requestOrigin": "front",
  "rawId": "AYQ7Myx9PhuOtQDVPzLai1TcCvHsbpMNju3Fw5HT0p7wn7RCaDqjtU4yavMfsd9V3RXHBPuL6B6ncw7mDNU-wBc",
  "id": "AYQ7Myx9PhuOtQDVPzLai1TcCvHsbpMNju3Fw5HT0p7wn7RCaDqjtU4yavMfsd9V3RXHBPuL6B6ncw7mDNU-wBc",
  "response": {
      "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiaGt2ampOS2ZCX2l5Si1HTEFERUJfdnlrZTJIR3FTY25pLXVIRFlrNUFiRllwT2oyOFhEelJTOUZLNHdLS3c2MTNzUFdvUl95YVI0V0FNOXhMQVA4dVEiLCJvcmlnaW4iOiJodHRwczpcL1wvbWFyY2gxc3QuY29tIiwiYW5kcm9pZFBhY2thZ2VOYW1lIjoiY29tLmFuZHJvaWQuY2hyb21lIn0",
      "attestationObject": "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YVjFklZeJ5e0KNoy69SOtrFz9KQJEK4JCvmj2bNi8j0wsD5FAAAAAAAAAAAAAAAAAAAAAAAAAAAAQQGEOzMsfT4bjrUA1T8y2otU3Arx7G6TDY7txcOR09Ke8J-0Qmg6o7VOMmrzH7HfVd0VxwT7i-gep3MO5gzVPsAXpQECAyYgASFYIF7Jra_Nezb4kCQeFKba6Uwm6qX_186HwENXefkw8sfeIlggxpYX0gwWWVNYCQLpeIn0b97cPhAwvVFz3VOtWTui57o",
      "transports": []
  },
  "type": "public-key",
  "extensions": {}
}

const cognitoConfig = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

    // REQUIRED - Amazon Cognito Region
    region: process.env.VUE_APP_COGNITO_REGION,

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'XX-XXXX-X',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.VUE_APP_COGNITO_USER_POOL_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    // mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    //     // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //     domain: '.yourdomain.com',
    //     // OPTIONAL - Cookie path
    //     path: '/',
    //     // OPTIONAL - Cookie expiration in days
    //     expires: 365,
    //     // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //     sameSite: "strict" | "lax",
    //     // OPTIONAL - Cookie secure flag
    //     // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //     secure: true
    // },

    // OPTIONAL - customized storage object
    // storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },

    // OPTIONAL - Hosted UI configuration
    // oauth: {
    //     domain: 'your_cognito_domain',
    //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    //     redirectSignIn: 'http://localhost:3000/',
    //     redirectSignOut: 'http://localhost:3000/',
    //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    // }
  },
};

export { cognitoConfig };
