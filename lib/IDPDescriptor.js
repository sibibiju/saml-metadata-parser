function getKey(keyDescriptor, type) {
    let length = Object.keys(keyDescriptor).length;
    let keys = [];
    for (let i = 0; i < length; i++) {
        if (keyDescriptor[i].$.use === type) {
            let X509Certificate = keyDescriptor[i]['ds:KeyInfo'][0]['ds:X509Data'][0]['ds:X509Certificate'][0];
            keys.push(X509Certificate);
        }
    }

    return keys;
}

function parseAttributes(attributes) {
    function transformAttribute(attribute) {
        return Object.assign({}, {
            key: attribute.Name,
            name: attribute.FriendlyName,
        }, );
    }
    return attributes.map(transformAttribute);
}

function getEntrypoint(SingleSignOnService) {
    const redirectBinding = 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect';
    let length = Object.keys(SingleSignOnService).length;
    for (let i = 0; i < length; i++) {
        if (SingleSignOnService[i].$.Binding == redirectBinding) {
            return SingleSignOnService[i].$.Location;
        }
    }
}

module.exports = class ISPSSODescriptor {
    constructor(metadata) {
        const base = metadata.EntityDescriptor.IDPSSODescriptor[0];

        this.signingKey = { value: getKey(base.KeyDescriptor, 'signing') }

        this.encryptionKey = { value: getKey(base.KeyDescriptor, 'encryption') }

        // Object.defineProperty(
        //     this,
        //     'attributes', { value: parseAttributes(base.Attribute) },
        // );

        this.SingleSignOnURL = { value: getEntrypoint(base.SingleSignOnService) }

        this.SingleLogoutURL = { value: getEntrypoint(base.SingleLogoutService) }
    }
};