import pino from "pino";
import { env } from "../config/env";

const stdTimeFunctions = pino.stdTimeFunctions ?? {
  isoTime: () => new Date().toISOString(),
};

export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        }
      : undefined,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: stdTimeFunctions.isoTime,
});
