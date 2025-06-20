export interface CredentialEntry {
    serial: number; // Unique identifier for the credential entry
    platform: string; // The platform or service for which the credentials are used
    username: string; // The username associated with the credential
    password: string; // The password associated with the credential
}