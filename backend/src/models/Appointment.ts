import { Model, DataTypes, Optional, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Room from './Room';

interface AppointmentAttributes {
    id: number;
    userId: number;
    roomId: number;
    title: string;
    description?: string;
    dateTime: Date;
    status: 'scheduled' | 'confirmed' | 'canceled' | 'completed';
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, 'id' | 'status' | 'description'> { }

class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttributes>
    implements AppointmentAttributes {
    public id!: number;
    public userId!: number;
    public title!: string;
    public description!: string;
    public dateTime!: Date;
    public roomId!: number;
    public status!: 'scheduled' | 'confirmed' | 'canceled' | 'completed';

    // Relacionamentos
    public getUser!: BelongsToGetAssociationMixin<User>;
    public readonly user?: User;

    public getRoom!: BelongsToGetAssociationMixin<Room>;
    public readonly room?: Room;
}

Appointment.init(
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
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
                notEmpty: true
            }
        },

        roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'room',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        status: {
            type: DataTypes.ENUM('scheduled', 'confirmed', 'canceled', 'completed'),
            allowNull: false,
            defaultValue: 'scheduled',
            validate: {
                isIn: [['scheduled', 'confirmed', 'canceled', 'completed']]
            }
        }
    },
    {
        sequelize,
        tableName: 'appointment',
        timestamps: true,
        indexes: [
            {
                fields: ['userId']
            },
            {
                fields: ['roomId']
            },
            {
                fields: ['dateTime']
            },
            {
                fields: ['status']
            },
            {
                fields: ['room']
            },
        ],

    }
);

export default Appointment;