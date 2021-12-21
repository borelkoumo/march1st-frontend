/**
 * Server configuration
 */
 const MODE_TYPES = {
  LOCAL: 0,
  ONLINE: 1,
};
Object.freeze(MODE_TYPES);

/**
 * THE CURRENT MODE APP IS OPERATING
 */
const CURRENT_MODE = MODE_TYPES.ONLINE;

/**
 * SET VALUES DEPENDING OF CURRENT MODE
 */
const CONFIG = {
  RPID: "",
  PROTOCOL: "",
  WEBAUTHN_PORT: 0,
};
switch (CURRENT_MODE) {
  case MODE_TYPES.LOCAL:
    CONFIG.PROTOCOL = "http";
    CONFIG.RPID = "localhost";
    CONFIG.WEBAUTHN_PORT = 8081;
    break;

  case MODE_TYPES.ONLINE:
    CONFIG.PROTOCOL = "https";
    CONFIG.RPID = "backend.march1st-beta.com";
    CONFIG.WEBAUTHN_PORT = 443;
    break;

  default:
    CONFIG.PROTOCOL = "http";
    CONFIG.RPID = "localhost";
    CONFIG.WEBAUTHN_PORT = 8081;
    break;
}
Object.freeze(CONFIG);

console.log(`CURRENT_MODE = ${CURRENT_MODE}`);
console.log(`CONFIG = ${JSON.stringify(CONFIG)}`);

module.exports = { CONFIG };
