import { Model, DataTypes, Optional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association } from 'sequelize';
import sequelize from '../config/database';
import Appointment from './Appointment';

interface RoomAttributes {
    id: number;
    name: string;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> { }

class Room extends Model<RoomAttributes, RoomCreationAttributes>
    implements RoomAttributes {
    public id!: number;
    public name!: string;

    public getAppointments!: HasManyGetAssociationsMixin<Appointment>;
    public addAppointment!: HasManyAddAssociationMixin<Appointment, number>;
    public hasAppointment!: HasManyHasAssociationMixin<Appointment, number>;

    // Associations
    public readonly appointments?: Appointment[];

    public static associations: {
        appointments: Association<Room, Appointment>;
    };
}

Room.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        },
    },
    {
        sequelize,
        tableName: 'rooms',
        timestamps: true,
        indexes: [
            {
                fields: ['name']
            }
        ]
    }
);

export default Room;