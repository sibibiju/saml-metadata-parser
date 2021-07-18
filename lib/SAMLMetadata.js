const EntityDescriptor = require('./EntityDescriptor');
const IDPDescriptor = require('./IDPDescriptor');

module.exports = class SAMLMetadata {
    constructor(metadata) {
        this.entity = new EntityDescriptor(metadata);
        this.IDP = new IDPDescriptor(metadata);
    }

    configureSP(configuration) {
        this.SP = configuration;
        return this;
    }

    getPassportConfig() {
        if (!this.SP) {
            throw Error("Missing SP configuration");
        }

        return {
            callbackUrl: this.SP.callbackUrl || null,
            entryPoint: this.IDP.SingleSignOnURL,
            issuer: this.SP.issuer || null,
            cert: this.IDP.signingKey,
            privateCert: this.SP.privateCert || null,
            decryptionPvk: this.IDP.encryptionKey,
            signatureAlgorithm: 'sha1',
        }
    }
}