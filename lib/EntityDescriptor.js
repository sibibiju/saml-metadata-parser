module.exports = class EntityDescriptor {
    constructor(metadata) {
        const entityDescriptor = metadata.EntityDescriptor;
        this.entityID = entityDescriptor.$.entityID;
        this.documentID = entityDescriptor.$.ID || null;
    }
};