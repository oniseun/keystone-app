const {
    Text,
    Checkbox,
    Password
} = require('@keystonejs/fields');
const {
    AutoIncrement
} = require('@keystonejs/fields-auto-increment');
const access =  require('./../config/access');

module.exports = {


    label: "Users",
    fields: {
        id: {
            type: AutoIncrement,
            gqlType: 'ID',
            isUnique: true
        },
        name: {
            type: Text,
            isRequired: true
        },
        email: {
            type: Text,
            isUnique: true,
            isRequired: true
        },
        isAdmin: {
            type: Checkbox,
            isRequired: true
        },
        password: {
            type: Password,
            isRequired: true
        }

    },
    access: {
        read: true,
        update: access.userIsAdminOrOwner,
        create: access.userIsAdmin,
        delete: access.userIsAdmin,
        auth: true,
      }
}