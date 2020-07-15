import glob from "glob";
import fs from "fs";

let mergedConfig = {};

glob("file_maps/*.config.json", (error: Error | null, files: string[]) => {
    files.forEach((file: string) => {
        fs.readFile(file, 'utf8', (err: NodeJS.ErrnoException | null, contents: string) => {
            const json = JSON.parse(contents);

            mergedConfig = {
                ...mergedConfig,
                ...json,
            };
        });
    });
});

const constMergedConfig = mergedConfig;

export default constMergedConfig;
