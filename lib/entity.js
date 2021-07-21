module.exports = class Entity {
    constructor(metadata) {
        const entity = metadata.EntityDescriptor;
        this.entityID = entity.$.entityID;
        this.documentID = entity.$.ID || null;
    }
};