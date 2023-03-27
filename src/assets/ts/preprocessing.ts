import * as d3 from "d3"

interface Entry {
    DOI?: string,
    key: string,
    YEAR: number,
    venue: string,
    detail: string,
    authors: string[],
    HREF?: string
}

interface Code {
    Key?: string,
    type?: string,
    Title?: string,
    Contribution: string,
    Setting: string,
    Emotion: boolean,
    Instrument: string,
    ["Emo Details"]: string,
    ["Qual."]: boolean,
    ["Quan."]: boolean,
    Timing: string,
    External: boolean,
    User: boolean,
    ["Data & Info"]: boolean,
    // Encoding: boolean,
    // Narrative: boolean,
    // Interaction: boolean,
    ["Vis Design"]: boolean,
    Unspecified: boolean,
    Effect: string,
    Venue: string,
    Type: string
}

type Format = Code & Entry

const loadData = function (metaPath="info.json", codePath="summary.tsv") {
    const jsonTask = d3.json(metaPath)
    const tsvTask = d3.tsv(codePath, d3.autoType)
    const tasks = Promise.all([jsonTask, tsvTask])
        .then(([meta, code]) => {
        code.forEach((c) => {
            Object.keys(c).forEach((k) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if(c[k] == 'TRUE') c[k] = true
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if(c[k] == 'FALSE') c[k] = false
            })
        })
        const map = buildList(meta as Array<Entry>, code as Array<Code>)
        map.sort((a, b) => {
            return a.YEAR - b.YEAR
          })
        return map
    })
    return tasks
}

const buildList = function (meta: Array<Entry>, code: Array<Code>) {
    // const pubMap = new Map() as Map<string, Format>
    const pubList = [] as Array<Format>
    code.forEach((c) => {
        let flag = false
        meta.forEach((m) => {
            if (c.Key == m.key) {
                flag = true
                const obj = {
                    key: m.key,
                    DOI: m.DOI || "",
                    HREF: m.HREF || "",
                    YEAR: m.YEAR,
                    title: c.Title || "",
                    authors: m.authors,
                    venue: m.venue,
                    detail: m.detail,
                    Contribution: c.Contribution,
                    Setting: c.Setting,
                    Emotion: c.Emotion,
                    Instrument: c.Instrument,
                    ["Emo Details"]: c["Emo Details"],
                    ["Qual."]: c["Qual."],
                    ["Quan."]: c["Quan."],
                    Timing: c.Timing,
                    External: c.External,
                    User: c.User,
                    ["Data & Info"]: c["Data & Info"],
                    // Encoding: c.Encoding,
                    // Narrative: c.Narrative,
                    // Interaction: c.Interaction,
                    ["Vis Design"]: c["Vis Design"],
                    Unspecified: c.Unspecified,
                    Effect: c.Effect,
                    Venue: c.Venue,
                    Type: c.Type
                }
                pubList.push(obj)
            }
        })
        if (!flag) console.log(c.Key)
    })
    return pubList
}

export {
    loadData,
    Format
}