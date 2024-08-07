const { AbilityBuilder, Ability } = require('@casl/ability');

function defineRulesFor(role) {
    const { can, rules } = new AbilityBuilder(Ability);

    if (role === 'Admin') {
        can('manage', 'all'); // Admin can manage everything
    } else if (role === 'BookOwner') {
        can('read', 'Book'); // BookOwner can read books
        can('create', 'Book'); // BookOwner can create books
    }

    return rules;
}

module.exports = defineRulesFor;
