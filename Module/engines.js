

const large = e => e.length > 0 && e.length <= 2048
const small = e => e.length > 0 && e.length <= 256
const number = e => e ? !isNaN(e) : true
const first = match => match[0] ? match[0][1].trim() : ""
const URL = e => {
    const regexURL = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})',"i") // (?:https?:\/\/)?(?:[\S]+?\.)?[\S]+?\.[\S]+(?:\.[\S]+)?
    return large(e) && regexURL.test(e)
}

module.exports = {
    title : {
        regex : /\$title([\W\w]+?)\n?\$(?:end)?/gm,
        toJSON : first,
        filter : small
    },
    description : {
        regex : /\$(?:description|desc)([\W\w]+?)\$(?:end)?/gm,
        toJSON : first,
        filter : large
    },
    url : {
        regex : /\$(?:url|link)([\W\w]+?)\$(?:end)?/gm,
        toJSON : first,
        filter : URL
    },
    color : {
        regex : /\$color([\W\w]+?)\$(?:end)?/gm,
        toJSON : match => Number(first(match)) || null,
        filter : number
    },
    timestamp : {
        regex : /\$(?:timestamp|time)([\W\w]+?)\$(?:end)?/gm,
        toJSON : match => first(match).toLowerCase().includes("now") ? Date.now() : Number(first(match)),
        filter : e => (new Date(e)).toString() != "Invalid Date"
    },
    footer : {
        regex : /\$footer([\W\w]+?)(?:\s*?(-img [^\s]+?))?\s*?\$(?:end)?/gm,
        toJSON : match => ({
            text : first(match),
            icon_url : match[0] ? (match[0].join("").includes("-img") ? match[0][2].replace("-img","").trim() : null) : null
        }),
        filter : e => (
            large(e.text) &&
            (e.icon_url == null || URL(e.icon_url))
        )
    },
    thumbnail : {
        regex : /\$(?:thumbnail|logo|thumb)([\W\w]+?)\$(?:end)?/gm,
        toJSON : first,
        filter : URL
    },
    image : {
        regex : /\$image([\W\w]+?)\$(?:end)?/gm,
        toJSON : first,
        filter : URL
    },
    author : {
        regex : /\$author([\W\w]+?)(?:\s*?(-(?:url|link|img) [^\s]+?))?(?:\s*?(-(?:url|link|img) [^\s]+?))?\s*?\$(?:end)?/gm,
        toJSON : match => ({
            name : first(match),
            url : match[0] ? (match[0][0].includes("-url") ? match[0].slice(1).find(e => e.includes("-url")).replace("-url","").trim() : null) : null,
            icon_url : match[0] ? (match[0][0].includes("-img") ? match[0].slice(1).find(e => e.includes("-img")).replace("-img","").trim() : null) : null
        }),
        filter : e => (
            small(e.name) &&
            (e.url == null || URL(e.url)) &&
            (e.icon_url == null || URL(e.icon_url))
        )
    },
    fields : {
        regex : /\$field([\w\W]+?)\n([\W\w]+?)\$(?:end)?/g,
        toJSON : match => match.map(field => ({
            name : field[1].trim(),
            value : field[2].replace(/\-inline/gm,"").trim(),
            inline : field[2].includes("-inline")
        })),
        filter : fields => fields.every(field => (
            small(field.name) && large(field.value)
        ))
    }
}