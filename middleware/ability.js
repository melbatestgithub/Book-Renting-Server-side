const { Ability, AbilityBuilder } = require('@casl/ability');

const defineAbilitiesFor = (user) => {
    const { can, rules } = new AbilityBuilder(Ability);

    if (user && user.id) {
        can('update', 'UploadedBook', { book_owner: user.id });
        can('delete', 'UploadedBook', { book_owner: user.id });
    } else {
        // Handle the case where the user object is not valid
        // You can adjust this based on your requirements
    }

    return new Ability(rules);
};

module.exports = defineAbilitiesFor;
