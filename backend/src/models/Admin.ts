import { Model, DataTypes, Optional, HasManyGetAssociationsMixin, Association, HasManyAddAssociationMixin, HasManyHasAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';
import Appointment from './Appointment';

interface AdminAttributes {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin';
    isActive: boolean;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'id' | 'role' | 'isActive'> { }

class Admin extends Model<AdminAttributes, AdminCreationAttributes>
    implements AdminAttributes {
    public id!: number;
    public name!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public role: 'admin' = 'admin';
    public isActive!: boolean;

    public getAppointments!: HasManyGetAssociationsMixin<Appointment>;
    public addAppointment!: HasManyAddAssociationMixin<Appointment, number>;
    public hasAppointment!: HasManyHasAssociationMixin<Appointment, number>;

    // Associations
    public readonly appointments?: Appointment[];

    public static associations: {
        appointments: Association<Admin, Appointment>;
    };

    public async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }

    public async removePassword(): Promise<void> {
        this.password = undefined as any;
    }

    //hook de criptografia de senha   
    public static async hashPassword(user: Admin): Promise<void> {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
}

Admin.init(
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
        lastName: {
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
            allowNull: false,
            get() {
                // Sempre retorna como UPPERCASE
                const rawValue = this.getDataValue('role');
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
        tableName: 'administrators',
        timestamps: true,
        hooks: {
            beforeCreate: Admin.hashPassword,
            beforeUpdate: Admin.hashPassword
        }
    }
);

export default Admin;