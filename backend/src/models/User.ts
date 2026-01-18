import { Model, DataTypes, Optional, HasManyGetAssociationsMixin, Association, HasManyAddAssociationMixin, HasManyHasAssociationMixin, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';
import Appointment from './Appointment';
import Permission from './Permission';

interface UserAttributes {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: 'client';
    isActive: boolean;
    zipCode: string;
    address: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'isActive'> { }

class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public name!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public role: 'client' = 'client';
    public isActive!: boolean;
    public zipCode!: string;
    public address!: string;
    public number!: string;
    public complement!: string;
    public district!: string;
    public city!: string;
    public state!: string;

    public getAppointments!: HasManyGetAssociationsMixin<Appointment>;
    public addAppointment!: HasManyAddAssociationMixin<Appointment, number>;
    public hasAppointment!: HasManyHasAssociationMixin<Appointment, number>;

    public getPermission!: HasManyGetAssociationsMixin<Permission>;
    public addPermission!: HasManyAddAssociationMixin<Permission, number>;
    public hasPermission!: HasManyHasAssociationMixin<Permission, number>;

    // Associations
    public readonly appointments?: Appointment[];
    public readonly permissions?: Permission[];

    public static associations: {
        appointments: Association<User, Appointment>;
        permissions: Association<User, Permission>;
    };

    public async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }

    public async removePassword(): Promise<void> {
        this.password = undefined as any;
    }

    //hook de criptografia de senha   
    public static async hashPassword(user: User): Promise<void> {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }

    //hook de criação de permissões
    public static async createPermissions(user: User): Promise<void> {
        Permission.create({
            userId: user.id,
            access: 'logs',
            isActive: false
        })

        Permission.create({
            userId: user.id,
            access: 'appointments',
            isActive: false
        })
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
            type: DataTypes.ENUM('client', 'user'),
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
        zipCode: {
            type: DataTypes.STRING(0),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Zip code is required'
                },
            }
        },

        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Address is required'
                },
            }
        },
        number: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        complement: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        district: {
            type: DataTypes.STRING(80),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'District is required'
                },
            }
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'City is required'
                },
            }
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'State is required'
                },
            }
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeCreate: User.hashPassword,
            beforeUpdate: User.hashPassword,
            afterCreate: User.createPermissions,
        }
    }
);



export default User;