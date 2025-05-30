import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error("The NODE_ENV environment variable is required but was not specified.");
}

const dotenvFiles = [
  `.env.${NODE_ENV}.local`,
  NODE_ENV !== "test" && ".env.local",
  `.env.${NODE_ENV}`,
  ".env",
].filter(Boolean) as string[];

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand.expand(
      dotenv.config({
        path: dotenvFile,
      })
    );
  }
});

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || "")
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);

  type EnvVariables = {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    [key: string]: string | undefined; 
  };
  

const getClientEnvironment = (publicUrl: string) => {
    const raw: EnvVariables = Object.keys(process.env)
    .filter((key) => key.startsWith("NEXT_PUBLIC_"))
    .reduce(
      (env, key) => {
        env[key as keyof EnvVariables] = process.env[key]; 
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || "development",
        PUBLIC_URL: publicUrl,
      } as EnvVariables 
    );
  

  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {} as Record<string, string>),
  };

  return { raw, stringified };
};

export default getClientEnvironment;
