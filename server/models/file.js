const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('pdf', 'video', 'mp3', 'image'),
            allowNull: false
        }
    });

    File.associate = (models) => {
        File.belongsTo(models.ClassResource);
    }

    return File;
}