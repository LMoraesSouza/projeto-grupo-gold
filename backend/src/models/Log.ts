import { Model, DataTypes, Optional, BelongsToGetAssociationMixin, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

interface LogAttributes {
    id: number;
    userId: number;
    activityDescription: string;
    module: "appointments" | "my account";
}

interface LogCreationAttributes extends Optional<LogAttributes, 'id'> { }

class Log extends Model<LogAttributes, LogCreationAttributes>
    implements LogAttributes {
    public id!: number;
    userId!: number;
    activityDescription!: string;
    module!: "appointments" | "my account";

    // Relacionamentos
    public getUser!: BelongsToGetAssociationMixin<User>;
    public readonly user?: User;

    public static associations: {
        user: Association<Log, User>;
    };
}

Log.init(
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
        activityDescription: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Description is required'
                },
            }
        },
        module: {
            type: DataTypes.ENUM('appointments', 'my account'),
            allowNull: false,
            defaultValue: 'appointments',
            validate: {
                isIn: [['appointments', 'my account']]
            },
            get() {
                // Sempre retorna como UPPERCASE
                const rawValue = this.getDataValue('module');
                return rawValue ? rawValue.toUpperCase() : rawValue;
            }
        },
    },
    {
        sequelize,
        tableName: 'logs',
        timestamps: true,
        indexes: [
            {
                fields: ['userId']
            },
            {
                fields: ['module']
            },
        ],

    }
);

export default Log;