
# 🕇 GodEmbed 🕇

Create a Discord RichEmbed from a GodEmbed text to use for "embed say" commands of your bots.  

### Example

When you type :

```
$title My Title  
$description Hello World  
```

You obtain :

![Result](https://cdn.discordapp.com/attachments/609313381421154304/619960128078217229/unknown.png)

## Install

```
npm i godembed
```

## Use with Discord

You can use Discord to test this module by doing the following :

```js
const toEmbed = require( "godembed" )

client.on( "message", message => {

    if( !message.system || !message.channel ) return

    if( message.content.startsWith( 'godembed' ) ){

        const input = message.content.replace( 'godembed', '' )
        const { output, errors } = toEmbed( input )

        message.channel.send( output )

        if( errors.length > 0 ){
            message.channel.send( errors.join('\n') )
        }
    }
})
```

## Use GodEmbed langage

All parts of a RichEmbed are definable from the GodEmbed language.  

### Documentation / Usage / Example

```
    Hey ! I'm a COMMENT in GodEmbed file (file.ge) because 
    I'm not between an opening tag and a closing tag \o/ 
    (my indentation is conventional)

    The "author" tag takes three arguments, two of which is optional :

        $author_tag author_name
        [image_url]
        [onclic_url]
        [$end_tag]

    Like this :

$author Ghom Krosmonaute 
https://cdn.discordapp.com/embed/avatars/0.png  
https://discordapp.com  
$end 

    The "end" tags are not mandatory but notament 
    recommended to be able to comment between two elements.

    As for example for this title :

$title Voici le titre !

$thumbnail https://cdn.discordapp.com/embed/avatars/0.png
$image https://cdn.discordapp.com/embed/avatars/0.png
$url https://discordapp.com $end

    As you can see, the requested arguments are 
    the same as for the RichEmbed constructor.
    (excluding attachments anyway)

    Unlike the "author" tag, the "description" tag only 
    takes a single argument of several lines.

$description 
Et biensûr la description qui comme 
le titre peut faire plusieur lignes !
$end 

    Sorry for the french content but I'm french so...

    Colors can only be given in hexadecimal.
    (Number form or hash String form)

$color #FF0000
$color 0xFF0000 $end

    The timestamp can be defined by a Unix timestamp 
    or with a date recognized by Moment.js but 
    it can also be defined with "now" as above.

$timestamp now

    Here is the structure of a field :

        $field_tag field_name
        [$and_tag]
        field_text
        [$inline_tag]
        [$end_tag]

    The "and" tags are needed to separate multiline arguments, 
    for example the "name" of a field and its multiline "text".

    You can also write it like this: $&.

$field Titre du premier field &and
Texte du premier field
$inline

$field Titre du second field
Texte du second field
$end

    At the end of the file, it is optional to add an "end" tag 
    because it is added automatically by the GodEmbed module.

$footer Texte du footer 
https://cdn.discordapp.com/embed/avatars/0.png
```

### This code gives that

![Result](https://cdn.discordapp.com/attachments/609313381421154304/619976933383602214/unknown.png)

# ![Join Discord server support 😄](https://discord.gg/3vC2XWK)
