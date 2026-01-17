import User from './User';
import Permission from './Permission';

export default function setupAssociations() {
    User.hasMany(Permission, {
        foreignKey: 'userId',
        as: 'permissions'
    });

    Permission.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    });


}