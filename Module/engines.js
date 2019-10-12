
const moment = require('moment')

// Moteur de test et de conversion des arguments
const processors = {
    'inline' : arg => /\$inline/i.test(arg),
    'url' : arg => /(https?:\/\/(?:www\.|(?!www))[a-z\d][a-z\d-]+[a-z\d]\.[^\s]{2,}|www\.[a-z\d][a-z\d-]+[a-z\d]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-z\d]+\.[^\s]{2,}|www\.[a-z\d]+\.[^\s]{2,})/i.test(arg) ? arg : false,
    'img' : arg => /\S+\.(?:jpg|jpeg|gif|png|bmp|webp)/i.test(arg) ? arg : false,
    '2048' : arg => arg.length > 0 && arg.length <= 2048 ? arg : false,
    '1024' : arg => arg.length > 0 && arg.length <= 1024 ? arg : false,
    '256' : arg => arg.length > 0 && arg.length <= 256 ? arg : false,
    'date' : arg => /now/i.test(arg) ? Date.now() : moment(arg).isValid() ? moment(arg).valueOf() : Date.now(),
    'color' : arg => /(?:(?:0x){0,1}|#{0,1})(?:[0-9A-F]{8}|[0-9A-F]{6})/i.test(arg) ? arg.startsWith('#') ? arg : Number(arg) : false
}

// Règlement des balises
const tags = {
    'title' : {
        args : ['256'],
        method : 'setTitle'
    },
    'author' : {
        args : ['256','?img','?url'],
        method : 'setAuthor'
    },
    'description' : {
        args : ['2048'],
        method : 'setDescription'
    },
    'footer' : {
        args : ['2048','?img'],
        method : 'setFooter'
    },
    'url' : {
        args : ['url'],
        method : 'setURL'
    },
    'image' : {
        args : ['img'],
        method : 'setImage'
    },
    'thumbnail' : {
        args : ['img'],
        method : 'setThumbnail'
    },
    'field' : {
        args : ['256','1024','?inline'],
        method : 'addField'
    },
    'timestamp' : {
        args : ['date'],
        method : 'setTimestamp',
    },
    'color' : {
        args : ['color'],
        method : 'setColor'
    }
}

// Texte de la regex globale
const regexString = `(?:\s|^)\$@tag\s+([\w\W]*?)\s+\$(?:end|${Object.keys(tags).join('|')})(?:\s|$)`

// Exportation
module.exports = {
    regexString : regexString,
    processors : processors,
    tags : tags
}