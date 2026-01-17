import { Model, DataTypes, Optional, BelongsToGetAssociationMixin, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Room from './Room';

interface AppointmentAttributes {
    id: number;
    userId: number;
    roomId: number;
    dateTime: Date;
    status: 'pending' | 'scheduled' | 'canceled' | 'completed';
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, 'id' | 'status'> { }

class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttributes>
    implements AppointmentAttributes {
    public id!: number;
    public userId!: number;
    public dateTime!: Date;
    public roomId!: number;
    public status!: 'pending' | 'scheduled' | 'canceled' | 'completed';

    // Relacionamentos
    public getUser!: BelongsToGetAssociationMixin<User>;
    public readonly user?: User;

    public getRoom!: BelongsToGetAssociationMixin<Room>;
    public readonly room?: Room;

    public static associations: {
        user: Association<Appointment, User>;
        room: Association<Appointment, Room>;
    };
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
                model: 'rooms',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        status: {
            type: DataTypes.ENUM('pending', 'scheduled', 'canceled', 'completed'),
            allowNull: false,
            defaultValue: 'pending',
            validate: {
                isIn: [['pending', 'scheduled', 'canceled', 'completed']]
            },
            get() {
                // Sempre retorna como UPPERCASE
                const rawValue = this.getDataValue('status');
                return rawValue ? rawValue.toUpperCase() : rawValue;
            }
        }
    },
    {
        sequelize,
        tableName: 'appointments',
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
        ],

    }
);

Appointment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Appointment.belongsTo(Room, {
    foreignKey: 'roomId',
    as: 'room'
});


export default Appointment;