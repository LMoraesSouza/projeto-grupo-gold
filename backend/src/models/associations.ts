import User from './User';
import Permission from './Permission';
import Log from './Log';

export default function setupAssociations() {
    User.hasMany(Permission, {
        foreignKey: 'userId',
        as: 'permissions'
    });

    User.hasMany(Log, {
        foreignKey: 'userId',
        as: 'logs'
    });

    Permission.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    });

    Log.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    });

}