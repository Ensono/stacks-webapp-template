/* eslint-disable import/prefer-default-export */
import { SingleConfigKey } from "../../model/config"

// TODO: beef this up and refactor other domain foldermaps
export const shared = {
    gitRepo: "",
    gitRef: "",
    localPath: "",
    folderMap: [
      {
        src: "shared/_gitignore",
        dest: "./.gitignore"
      }
    ]
} as SingleConfigKey
