module.exports = function (sequelize, DataTypes) {
    let delivery = sequelize.define(
        'delivery',
        {
            id: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            departure: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            destination: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            item: {
                type: DataTypes.STRING(300),
                allowNull: false,
            },
            inPerson: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            date: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            time: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {}
    );
    delivery.associate = function (models) {
        delivery.belongsTo(models.user);
    };
    return delivery;
};
