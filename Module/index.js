
const path = require( "path" )
const { processors, tags, regexString, isolations } = require( path.resolve( __dirname, "engines.js" ) )
const { RichEmbed } = require( "discord.js" )

function toEmbed( string ){

    let source = string + '\n$end'
    
    const output = new RichEmbed()
    const errors = []

    // Pour chaque balise
    for( tag in tags ){

        const [ args, method ] = tags[ tag ]
        const regex = new RegExp( regexString.replace( '@tag', tag ), 'i' )
        const types = args.map( arg => arg.replace( '?', '' ) )
        
        // Tant que la balise existe dans "source"
        while( regex.test( source ) ){
            
            const valids = []
            const [ fullmatch, content ] = regex.exec( source )
            source = source.replace( '$' + tag, '' )
            delete fullmatch

            // Pour chaque type en partant du moins ambigue
            for( type in processors ){

                const isolation = isolations[ type ]
                const processor = processors[ type ]

                // Si le type du processeur existe dans les arguments du tag
                if( types.includes( type ) ){

                    const arg = args[ types.indexOf( type ) ]

                    // Isoler l'argument et le convertir
                    const valid = processor( isolation( content ) )

                    // Si l'argument est valide
                    if( valid ){

                        // Ajouter l'argument converti dans l'array
                        valids.push( valid )

                    // Sinon si l'argument n'est pas optionnel
                    }else if( !arg.startsWith('?') ){

                        // Ajouter une erreur dans le log d'erreurs
                        errors.push( `` )

                    }
                }
            }

            // Ajouter les arguments à l'embed
            output[ method ]( ...valids.reverse() )
        }
    }

    return {
        output : output,
        errors : errors
    }
}

module.exports = toEmbed