export const up = async ({ context }: any) => {
  const sequelize = context.sequelize

  await sequelize.getQueryInterface().createTable("complaint", {
    id: {
      type: sequelize.DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    customer_id: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },
    order_id: {
      type: sequelize.DataTypes.STRING,
      allowNull: true,
    },
    order_number: {
      type: sequelize.DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: sequelize.DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: sequelize.DataTypes.STRING,
      defaultValue: "open",
    },
    created_at: {
      type: sequelize.DataTypes.DATE,
      defaultValue: sequelize.fn("now"),
    },
    updated_at: {
      type: sequelize.DataTypes.DATE,
      defaultValue: sequelize.fn("now"),
    },
  })
}

export const down = async ({ context }: any) => {
  const sequelize = context.sequelize
  await sequelize.getQueryInterface().dropTable("complaint")
}
