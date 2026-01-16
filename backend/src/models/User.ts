import { Model, DataTypes, Optional, HasManyGetAssociationsMixin, Association, HasManyAddAssociationMixin, HasManyHasAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';
import Appointment from './Appointment';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'client' | 'admin';
    isActive: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'isActive'> { }

class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: 'client' | 'admin';
    public isActive!: boolean;

    public getAppointments!: HasManyGetAssociationsMixin<Appointment>;
    public addAppointment!: HasManyAddAssociationMixin<Appointment, number>;
    public hasAppointment!: HasManyHasAssociationMixin<Appointment, number>;

    // Associations
    public readonly appointments?: Appointment[];

    public static associations: {
        appointments: Association<User, Appointment>;
    };

    public async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }

    //hook de criptografia de senha   
    public static async hashPassword(user: User): Promise<void> {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Name is required'
                },
                len: {
                    args: [2, 100],
                    msg: 'Name must be between 2 and 100 characters'
                }
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                name: 'unique_email',
                msg: 'Email already exists'
            },
            validate: {
                notEmpty: {
                    msg: 'Email is required'
                },
                isEmail: {
                    msg: 'Please provide a valid email'
                }
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password is required'
                },
                len: {
                    args: [6, 255],
                    msg: 'Password must be at least 6 characters'
                }
            }
        },
        role: {
            type: DataTypes.ENUM('client', 'admin'),
            defaultValue: 'client',
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeCreate: User.hashPassword,
            beforeUpdate: User.hashPassword
        }
    }
);

export default User;