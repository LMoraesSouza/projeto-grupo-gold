import { Model, DataTypes, Optional, BelongsToGetAssociationMixin, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

interface PermissionAttributes {
    id: number;
    userId: number;
    access: 'appointments' | 'logs';
    isActive: boolean;
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, 'id' | 'isActive'> { }

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes>
    implements PermissionAttributes {
    public id!: number;
    userId!: number;
    access!: 'appointments' | 'logs';
    isActive!: boolean;

    // Relacionamentos
    public getUser!: BelongsToGetAssociationMixin<User>;
    public readonly user?: User;

    public static associations: {
        user: Association<Permission, User>;
    };
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        access: {
            type: DataTypes.ENUM('appointments', 'logs'),
            allowNull: false,
            defaultValue: 'appointments',
            validate: {
                isIn: [['appointments', 'logs']]
            },
            get() {
                // Sempre retorna como UPPERCASE
                const rawValue = this.getDataValue('access');
                return rawValue ? rawValue.toUpperCase() : rawValue;
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: 'permissions',
        timestamps: true,
        indexes: [
            {
                fields: ['userId']
            },
            {
                fields: ['access']
            },
        ],

    }
);

export default Permission;