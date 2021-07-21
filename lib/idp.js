function getKey(keyDescriptor, type) {
    let result = keyDescriptor.find(item => item.$.use == type);
    if (result !== undefined) {
        result = result['KeyInfo'][0]['X509Data'][0]['X509Certificate'][0];
    } else {
        result = null;
    }

    return result;
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

function getLocation(SingleSignOnService) {
    const redirectBinding = 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect';
    const result = SingleSignOnService.find(item => item.$.Binding === redirectBinding);

    return result.$.Location;
}

module.exports = class Idp {
    constructor(metadata) {
        const base = metadata.EntityDescriptor.IDPSSODescriptor[0];

        this.signingKey = { value: getKey(base.KeyDescriptor, 'signing') }
        this.encryptionKey = { value: getKey(base.KeyDescriptor, 'encryption') }
        this.SingleSignOnUrl = { value: getLocation(base.SingleSignOnService) }
        this.SingleLogoutUrl = { value: getLocation(base.SingleLogoutService) }
    }
};