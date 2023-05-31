'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalibrationData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CalibrationData.init({
    calibration_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clientName: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    clientAddress: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    clientPhone: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    clientEmail: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    calibrationType: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    equipmentManufacturer: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    equipmentModelNumber: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    equipmentSerialNumber: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    calibrationToolUsed: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    calibrationToolManufacturer: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    calibrationToolMN: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    calibrationToolSN: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    setpoint: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    asLeft: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    asFound: { 
        type: DataTypes.STRING, 
        allowNull: true 
    }
}, {
    
        sequelize, 
        modelName: 'CalibrationData',
        tableName: 'CalibrationData',
        timestamps: true,     
})

//Export
return CalibrationData;
};