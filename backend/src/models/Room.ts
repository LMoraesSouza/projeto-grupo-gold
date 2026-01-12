import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface RoomAttributes {
    id: number;
    name: string;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> { }

class Room extends Model<RoomAttributes, RoomCreationAttributes>
    implements RoomAttributes {
    public id!: number;
    public name!: string;
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
        tableName: 'room',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['name']
            }
        ]
    }
);

export default Room;