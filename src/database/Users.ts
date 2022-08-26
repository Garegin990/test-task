import { Model, DataTypes} from 'sequelize';
import db from '../configurations/db';

interface UserAttributes{
    id :string;
    name:string;
    email  :string;
    password:string;
    phone:number;
    admin: boolean;
    timeSlot:number
}

class Users extends Model<UserAttributes> implements UserAttributes{
    id :string;
    name:string;
    email  :string;
    password:string;
    phone:number;
    admin:boolean
    timeSlot:number
}

Users.init(
  {
      id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
      },
      email: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
      password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          get: () => null,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
      timeSlot:{
          type: DataTypes.STRING,
          defaultValue: null,
      },
      admin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
  },
  {
      sequelize: db,
      tableName: 'users',
      timestamps: true,
  }
);
export default Users;