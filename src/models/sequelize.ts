import pg from "pg";
import { Sequelize } from "sequelize";
import { initUser } from "@/models/user.model";

let sequelize: Sequelize | null = null;

export async function initSequelize(): Promise<Sequelize> {
  if (sequelize) {
    return sequelize;
  }

  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL environment variable is not set");
  }

  sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialectModule: pg,
  });

  initUser(sequelize);

  return sequelize;
}

export async function closeSequelize() {
  if (sequelize) {
    await sequelize.close();
    sequelize = null;
  }
}
export default sequelize;
