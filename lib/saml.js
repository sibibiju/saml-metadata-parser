const entity = require('./entity');
const idp = require('./idp');
module.exports = class Saml {
    constructor(metadata) {
        this.entity = new entity(metadata);
        this.idp = new idp(metadata);
    }

    configureSP(configuration) {
        this.sp = configuration;
        return this;
    }

    getPassportConfig() {
        if (!this.sp) {
            throw Error("Missing SP configuration");
        }

        let issuer = this.sp.EntityDescriptor.$.entityID;
        return {
            callbackUrl: this.sp.callbackUrl || null,
            entryPoint: this.idp.singleSignOnUrl.value,
            issuer: issuer || null,
            cert: this.idp.signingKey,
            privateCert: this.sp.privateCert || null,
            decryptionPvk: this.idp.encryptionKey.value,
            signatureAlgorithm: 'sha1',
        }
    }
}