/**
 * PublicKeyCredential
 *
 *
 * The PublicKeyCredential interface provides information about a public key / private key pair,
 * which is a credential for logging in to a service using an un-phishable and data-breach resistant asymmetric key pair
 * instead of a password.
 * It inherits from Credential, and was created by the Web Authentication API extension to the Credential Management API.
 * Other interfaces that inherit from Credential are PasswordCredential and FederatedCredential.
 *
 * Secure context: This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.
 *
 * @returns
 * - true if the PublicKeyCredential interface is available,
 * - and false if WebAuthn not supported in browser (See https://caniuse.com/?search=webauthn) of if we are not in secure contexts (HTTPS)
 */

const isBrowserCompatible = () => {
  return window.PublicKeyCredential ? true : false;
};

/**
 * This methods returns a Promise which resolves to true if a user-verifying platform authenticator is available.
 *
 * A user-verifying platform authenticator is a kind of multi-factor authenticator that is part of the client device
 * (it is generally not removable) and that involves an action from the user in order to identify them.
 * Common user-verifying platform authenticators include:
 * - Touch ID or Face ID (macOS and iOS)
 * - Windows Hello (Windows)
 * - Device unlock (fingerprint, face, PIN, etc.) on Android
 *
 * Secure context: This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.
 *
 * @returns true if a user-verifying platform authenticator is available.
 *
 */
const isPlatformAuthenticatorAvailable = () => {
  // If PublicKeyCredential interface is not available, return false
  if (!isBrowserCompatible()) {
    return false;
  }
  if (
    typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !==
    "function"
  ) {
    // Use another kind of authenticator or a classical login/password
    // workflow
    return false;
  } else {
    return PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
      .then(function (available) {
        //console.log(available);
        if (available) {
          // We can proceed with the creation of a PublicKeyCredential
          // with this authenticator
          return true;
        } else {
          // Use another kind of authenticator or a classical login/password
          // workflow
          return false;
        }
      })
      .catch(function (err) {
        // Something went wrong
        console.error(err);
        return false;
      });
  }
};

export { isPlatformAuthenticatorAvailable, isBrowserCompatible };
