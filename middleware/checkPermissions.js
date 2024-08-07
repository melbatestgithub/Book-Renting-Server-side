const { Ability } = require('@casl/ability');
const defineRulesFor = require('./abilities');

function checkPermissions(action, subject) {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const rules = defineRulesFor(decoded.role);
            const ability = new Ability(rules);

            if (ability.can(action, subject)) {
                return next();
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
}

module.exports = checkPermissions;
