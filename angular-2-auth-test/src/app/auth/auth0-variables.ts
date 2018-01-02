interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'DN4VGn4YJsikf5k87EuJ44lVZi9mBFrh',
  domain: 'cam-viewer-hjbello.eu.auth0.com',
  callbackURL: 'http://localhost:3000/callback'
};
