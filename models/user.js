module.exports = function (sequelize, DataTypes) {
    let user = sequelize.define(
        'user',
        {
            phoneNumber: {
                type: DataTypes.STRING(100),
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            salt: {
                type: DataTypes.STRING(128),
                allowNull: true,
            },
            isAdmin: {
                type: DataTypes.INTEGER(1),
                defaultValue: 0,
            },
        },
        {}
    );
    user.associate = function (models) {
        user.hasMany(models.delivery);
    };
    return user;
};
