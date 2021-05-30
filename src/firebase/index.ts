import firebase from "firebase-admin";
import credentials from "../configs/firebase-config.json";

const serviceAccount: any = {
    type: credentials.type,
    project_id: credentials.project_id,
    private_key_id: credentials.private_key_id,
    private_key: credentials.private_key,
    client_email: credentials.client_email,
    client_id: credentials.client_id,
    auth_uri: credentials.auth_uri,
    token_uri: credentials.token_uri,
    auth_provider_x509_cert_url: credentials.auth_provider_x509_cert_url,
    client_x509_cert_url: credentials.client_x509_cert_url
}

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://storebyoppie-default-rtdb.firebaseio.com"
})

export default firebase;