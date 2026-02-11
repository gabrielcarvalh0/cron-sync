// src/lib/env.ts
import dotenv from "dotenv";

dotenv.config();

export const env = {
  SHOPPUB_STORE: process.env.SHOPPUB_STORE,
  SHOPPUB_TOKEN: process.env.SHOPPUB_TOKEN,
  BQ_DATASET: process.env.BQ_DATASET,
};
