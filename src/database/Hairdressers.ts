import {Model, DataTypes} from 'sequelize';
import db from '../configurations/db';

interface HairdresserAttributes{
    id :string;
    freeTimeSlots:string;
    email  :string;
    spec:string;
    phone:number;
    name:string;
}

class Hairdressers extends Model<HairdresserAttributes> implements HairdresserAttributes{
    id :string;
    freeTimeSlots:string;
    email  :string;
    spec:string;
    phone:number;
    name:string;
}
Hairdressers.init(
  {
      id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
      },
      phone: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
      name: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
      spec: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
      freeTimeSlots: {
          type: DataTypes.DATE,
          allowNull: false,
      }
  },
  {
      sequelize: db,
      tableName: 'hairdressers',
      timestamps: false,
  }
);

// Hairdressers.belongsTo(Users, {
//   onDelete: 'SET NULL',
//   onUpdate: 'SET NULL',
//   foreignKey: 'userId',
//   as: 'users',
// });
//
// Users.hasMany(Hairdressers, {
//   onDelete: 'SET NULL',
//   onUpdate: 'SET NULL',
//   foreignKey: 'userId',
//   as: 'products',
// });

export default Hairdressers
