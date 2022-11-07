module.exports = function (sequelize, DataTypes) {
    let user = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER(1),
                defaultValue: 1,
            },
        },
        {}
    );
    user.associate = function (models) {
        user.hasMany(models.delivery);
    };
    return user;
};
