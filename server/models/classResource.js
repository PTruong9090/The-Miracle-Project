const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const ClassResource = sequelize.define('ClassResource', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    ClassResource.associate = (models) => {
        ClassResource.belongsTo(models.Class);
        ClassResource.hasMany(models.File, { onDelete: 'cascade' });
    }

    return ClassResource;
}