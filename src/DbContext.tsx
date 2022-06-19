import React, { ReactNode, useEffect, useState } from 'react'

interface Pronunciation {
  initial?: string; 
  final?: string;
  tone?: string;
  
}

export interface Definition {
  rad: string;
  stroke: string;
  phoneticClass: string;
  cangjie: string,
  rank: number, 
  freq: number,
  phonetics: {
    lshk: Pronunciation[],
    yale: Pronunciation[],
    meanings: string[];
  }
}

export interface Dictionary {
  [char: string]: Definition
}

interface DictContextValue {
  db: Dictionary,
}

const DbContext = React.createContext<DictContextValue>({} as DictContextValue)

export const DbProvider = ({children}: {children: ReactNode}) => {
  const [db, setDb] = useState<Dictionary>(parseDb(localStorage.getItem('db') || "{}"))

  useEffect(() => {
    if ( Object.keys(db).length === 0 ) {
      fetch('https://data.yuedict.app/dict.json')
        .then(r => r.text())
        .then(_db => {
          localStorage.setItem('db', _db)
          setDb(parseDb(_db))
        })
    }
  }, [db, setDb])

  return (
    <DbContext.Provider
      value={{
        db
      }}
    >
      {children}
    </DbContext.Provider>
  )
}

export default DbContext

const parseDb = (jsonStr: string): Dictionary => {
  try {
    return Object
      .entries(JSON.parse(jsonStr))
      .reduce((acc: any, [char, r]: [string, any]) => {
        acc[char] = {
          rad: r[0],
          stroke: r[1],
          phoneticClass: r[2],
          cangjie: r[3],
          rank: parseInt(r[4] ,10),
          freq: parseInt(r[5], 10),
          phonetics: {
            lshk: r[6][0].map((p: any): Pronunciation => {
              return {
                initial: p[0][0],
                final: p[0][1],
                tone: p[0][2]
              }
            }),
            yale: r[6][1].map((p: any): Pronunciation => {
              return {
                initial: p[0][1],
                final: p[0][1],
                tone: p[0][2]
              }
            }),
            meanings: r[6][0].map((p: any): string => p[1])
          }
        }
        return acc
      }, {});
  } catch (e) {
    return {}
  }
};