import Keycloak from "keycloak-js";
import { DAFTAR_AUTH_BASE_URL } from "../../config";

const keycloak = new Keycloak({
    url: DAFTAR_AUTH_BASE_URL,  // Keycloak Server
    realm: "daftar-realm",  // Your realm name
    clientId: "daftar-backoffice",  // Your client ID
});

export function isAdmin() {
    return keycloak.tokenParsed?.realm_access?.roles?.includes("admin");
}

export default keycloak;
