
const { processors, tags, regexString } = require( "./engines.js" )
const { RichEmbed } = require( "discord.js" )

function toEmbed( string ){

    let source = string + '\n$end'
    
    const output = new RichEmbed()
    const errors = []

    // Pour chaque balise existente
    for( tag in tags ){

        const { args, method } = tags[ tag ]
        const types = args.map( arg => arg.replace( '?', '' ) )
        const regex = new RegExp( regexString.replace( '@tag', tag ), 'i' )
        
        // Pour chaque occurence de cette balise
        while( regex.test( source ) ){
            
            let argContents
            const logArgs = []
            const valids = []
            const andTagRegex = /\s+\$(?:and|&)\s+/i
            let [ fullmatch, content ] = regex.exec( source )

            source = source.replace( '$' + tag, '$end' )
            content = content.trim()

            if( args.length == 1 ){
                argContents = [ content ]
            }else{
                if( andTagRegex.test( content ) ){
                    console.log('test:',andTagRegex)
                    argContents = content.split( andTagRegex )
                }else{
                    argContents = content.split( /\s*[\r\n]+\s*/ )
                }
            }

            delete fullmatch
            delete content

            // Pour chaque argument demandé par la méthode
            types.forEach(( type, index ) => {

                const fullArg = args[ index ]
                let arg = argContents[ index ]

                // Si l'argument n'est pas null ou "null"
                if( arg && !/^\$null$/i.test( arg ) ){

                    // Convertir l'argument
                    const valid = processors[ type ]( arg )

                    // Injection de validité
                    if( valid === 'invalid' ){
                        logArgs.push( 'invalid: ' + type )
                    }else{
                        logArgs.push( 'valid: ' + type )
                        valids[ index ] = valid
                    }
                }else{

                    // Injection de nullité
                    if( fullArg.startsWith( '?' ) ){
                        logArgs.push( 'omit: ' + type )
                        valids[ index ] = null
                    }else{
                        logArgs.push( 'forget: ' + type )
                        valids[ index ] = 'GodArgumentError'
                    }
                }
            })

            // Si les arguments obligatoires sont présents
            if( !valids.find(( arg ) => arg === 'GodArgumentError') ){
                // Ajouter les arguments à l'embed
                output[ method ]( ...valids )

            // Sinon
            }else{
                // Ajouter une erreur dans le log d'erreurs
                errors.push( `Missing argument(s): ${ method }( ${ logArgs.join( ', ' ) } )` )
            }
        }
    }

    return {
        embed : embed,
        errors : errors
    }
}

module.exports = toEmbed