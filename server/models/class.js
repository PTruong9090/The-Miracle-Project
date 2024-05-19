const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define('Class', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        className: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING
        }
    });

    // Associations
    Class.associate = (models) => {
        Class.belongsTo(models.Teacher);

        Class.hasMany(models.ClassResource, {
            onDelete: 'cascade'
        })
    }

    return Class;
}
