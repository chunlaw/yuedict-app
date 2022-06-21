import React, { ReactNode, useEffect, useState } from "react";
import { compress, decompress } from "lzutf8-light";

export interface Pronunciation {
  initial?: string;
  final?: string;
  tone?: string;
  meanings?: string;
}

export interface Definition {
  rad: string;
  stroke: number;
  phoneticClass: string;
  cangjie: string;
  rank: number;
  freq: number;
  phonetics: {
    lshk: Pronunciation[];
    yale: Pronunciation[];
  };
  sources: string;
  combinations: string[];
  mandarin: string[];
  englist: string;
}

export interface Dictionary {
  [char: string]: Definition;
}

interface DictContextValue {
  db: Dictionary;
  phoneticSys: "lshk" | "yale";
  setSys: (sys: "lshk" | "yale") => void;
}

interface DictContextState {
  db: Dictionary;
  phoneticSys: "lshk" | "yale";
}

const AppContext = React.createContext<DictContextValue>(
  {} as DictContextValue
);

const getLocalStorageDb = (): string => {
  try {
    return decompress(localStorage.getItem("db"), { inputEncoding: "Base64" });
  } catch (err) {
    return "{}";
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DictContextState>({
    db: parseDb(getLocalStorageDb()),
    phoneticSys: "lshk",
  });

  const setDb = (_db: Dictionary) => {
    setState((prev) => ({
      ...prev,
      db: _db,
    }));
  };

  useEffect(() => {
    if (Object.keys(state.db).length === 0) {
      fetch("https://data.yuedict.app/dict.json")
        .then((r) => r.text())
        .then((_db) => {
          localStorage.setItem(
            "db",
            compress(_db, { outputEncoding: "Base64" })
          );
          setDb(parseDb(_db));
        });
    }
  }, [state.db, setDb]);

  const setSys = (sys: "lshk" | "yale") => {
    setState((prev) => ({
      ...prev,
      phoneticSys: sys,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        db: state.db,
        phoneticSys: state.phoneticSys,
        setSys,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

const parseDb = (jsonStr: string): Dictionary => {
  try {
    return Object.entries(JSON.parse(jsonStr)).reduce(
      (acc: any, [char, r]: [string, any]) => {
        acc[char] = {
          rad: r[0],
          stroke: parseInt(r[1], 10),
          phoneticClass: r[2],
          cangjie: r[3],
          rank: parseInt(r[4], 10),
          freq: parseInt(r[5], 10),
          phonetics: {
            lshk: r[6][0].map((p: any): Pronunciation => {
              return {
                initial: p[0][0],
                final: p[0][1],
                tone: p[0][2],
                meanings: p[1],
              };
            }),
            yale: r[6][1].map((p: any): Pronunciation => {
              return {
                initial: p[0][0],
                final: p[0][1],
                tone: p[0][2],
                meanings: p[1],
              };
            }),
          },
          sources: r[7],
          combinations: r[8],
          mandarin: r[9],
          englist: r[10],
        };
        return acc;
      },
      {}
    );
  } catch (e) {
    return {};
  }
};
