const {
    Text,
    Relationship
} = require('@keystonejs/fields');
const {
    AutoIncrement
} = require('@keystonejs/fields-auto-increment');

const access =  require('./../config/access');

module.exports = {
    
    label: "User Addresses",
    fields: {
        id: {
            type: AutoIncrement,
            gqlType: 'ID',
            isUnique: true
        },
        street: {
            type: Text,
            isRequired: true
        },
        address1: {
            type: Text,
            isRequired: true
        },
        address2: {
            type: Text
        },
        suburb: {
            type: Text,
            isRequired: true
        },
        town: {
            type: Text,
            isRequired: true
        },
        user_id: {
            type: Relationship,
            ref: 'User.id'
        }
    },
    access: {
        read: access.userIsAdmin,
        update: access.userIsAdmin,
        create: access.userIsAdmin,
        delete: access.userIsAdmin,
        auth: true,
      },
      adminConfig: {
        defaultColumns: 'id, street, suburb',
        defaultPageSize: 50,
        defaultSort: 'id',
        maximumPageSize: 100,
      }
}