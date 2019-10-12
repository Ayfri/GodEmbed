
const { processors, tags, regexString } = require(  "./engines.js" )
const { RichEmbed } = require( "discord.js" )

function toEmbed( string ){

    let source = string + '\n$end'
    
    const output = new RichEmbed()
    const errors = []

    // Pour chaque balise existente
    for( tag in tags ){

        const [ args, method ] = tags[ tag ]
        const regex = new RegExp( regexString.replace( '@tag', tag ), 'i' )
        const types = args.map( arg => arg.replace( '?', '' ) )
        
        // Pour chaque occurence de cette balise
        while( regex.test( source ) ){
            
            let contentArgs
            const logArgs = []
            const valids = []
            const [ fullmatch, content ] = regex.exec( source )
            const andTagRegex = /\s+\$(?:and|&)\s+/i

            source = source.replace( '$' + tag, '' )
            content = content.trim()

            if( args.length == 1 ){
                contentArgs = [ content ]
            }else{
                if( andTagRegex.test( content ) ){
                    contentArgs = content.split( andTagRegex )
                }else{
                    contentArgs = content.split( /[\r\n]+/ )
                }
            }

            delete fullmatch
            delete content

            // Pour chaque argument trouvé dans le contenu
            contentArgs.forEach(( arg, index ) => {

                // Si l'argument est en trop : return
                if( index >= args.length ) return

                const type = types[ index ]
                const processor = processors[ type ]

                // Isoler l'argument et le convertir
                const valid = processor( arg )

                // Si l'argument est valide
                if( valid ){
                    // Ajouter l'argument converti dans l'array
                    valids.push( valid )
                    logArgs.push( type + ' ✅' )

                // Sinon si l'argument n'est pas optionnel
                }else if( !arg.startsWith('?') ){
                    logArgs.push( type + ' ❓' )
                }else{
                    logArgs.push( type + ' ❔' )
                }
            })

            // Si les arguments obligatoires sont présents
            if( valids.length > args.filter( arg => !arg.startsWith( '?' ) ).length ){
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
        output : output,
        errors : errors
    }
}

module.exports = toEmbed