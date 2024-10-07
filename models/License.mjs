import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.mjs";

const License = sequelize.define("License", {
   user: {
       type: DataTypes.STRING,
       allowNull: false,
   },
    domain: {
       type: DataTypes.STRING,
        allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    licenseKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "licenses",
    timestamps: false,
});

export default License;