import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as process from "node:process";

export interface AuthorData {
  username: string | undefined;
  userProfileUrl: string | undefined;
  sentenceId: string | undefined;
  sentenceUrl: string | undefined;
}

export interface IUserData {
  en: AuthorData;
  tr: AuthorData;
}

export interface ISentenceData {
  en: string;
  tr: string;
  user: IUserData;
}

const parseUserData = (userLine: string): IUserData => {
  const nameData: string[] | null = userLine.match(/\(.*?\)/g) || null;
  const idData = userLine.match(/[0-9]+[^#\s.]/g) || null;
  const enAuthorName = nameData !== null ? nameData[1].replace(/\(|\)/g, "") : undefined;
  const trAuthorName = nameData !== null ? nameData[2].replace(/\(|\)/g, "") : undefined;
  const enId = idData !== null ? idData[0] : undefined;
  const trId = idData !== null ? idData[1] : undefined;

  const userData: IUserData = {
    en: {
      sentenceId: enId,
      sentenceUrl: enId ? `https://tatoeba.org/sentences/show/${enId}` : undefined,
      username: enAuthorName,
      userProfileUrl: enAuthorName ? `https://tatoeba.org/user/profile/${enAuthorName}` : undefined
    },
    tr: {
      sentenceId: trId,
      sentenceUrl: trId ? `https://tatoeba.org/sentences/show/${trId}` : undefined,
      username: trAuthorName,
      userProfileUrl: trAuthorName ? `https://tatoeba.org/user/profile/${trAuthorName}` : undefined
    }
  }

  return userData;
}


const parseLine = (line: string): ISentenceData | undefined => {
  if (line !== undefined && line !== null && line.trim() !== "") {
    const lineData = line.split("\t");
    if (lineData && lineData.length === 3) {
      const enSentence = lineData[0];
      const trSentence = lineData[1];
      const userData: IUserData = parseUserData(lineData[2]);

      const returnValue: ISentenceData = {
        en: enSentence,
        tr: trSentence,
        user: userData
      }

      return returnValue;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

(async () => {
  try {
    const txtPath: string | undefined = process.argv[2];
    if (typeof txtPath !== "undefined" && txtPath.endsWith(".txt")) {
      console.time("Parse Time");
      const filePath = path.join(process.cwd(), txtPath);
      const jsonPath = path.join(process.cwd(), txtPath.replace(".txt", ".json"));
      const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
      const lineArray = fileContent.split("\n");
      const fileWriteData: (undefined | ISentenceData)[] = lineArray.map((line) => parseLine(line));
      await fs.writeFile(jsonPath, JSON.stringify(fileWriteData, null, 2), { encoding: "utf-8" });
      console.timeEnd("Parse Time");
      console.log("Saved file here : " + txtPath.replace(".txt", ".json"));
      console.log("Sentence Length : " + lineArray.length)
    } else {
      if (!txtPath.endsWith(".txt")) {
        console.log("Only .txt file.");
      } else {
        console.error("Don't empty txt file path. ");
      }
    }
  } catch (error: any) {
    if (error.path) {
      console.error("Can't open : " + error.path);
    } else {
      console.error(error);
    }
  }
})();

