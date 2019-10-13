
# 🕇 GodEmbed 🕇

Create a Discord RichEmbed from a GodEmbed text.  
To use for "embed say" commands of your bot.  
Go to <a href="https://github.com/CamilleAbella/GodEmbed/blob/master/Module/docs.md">documentation</a> for details about usage.

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

## Usage

```js
const toEmbed = require( "godembed" )

client.on( "message", message => {

    if( !message.system || !message.channel ) return

    if( message.content.startsWith( 'godembed' ) ){

        const input = message.content.replace( 'godembed', '' )
        const { embed, errors } = toEmbed( input )
        // Or const output = toEmbed( input )

        message.channel.send( embed )
        // Or message.channel.send( output.embed )

        if( errors.length > 0 ){
            message.channel.send( errors.join('\n') )
        }
        // Or
        // if( output.errors.length > 0 ){
        //     message.channel.send( output.errors.join('\n') )
        // }
    }
})
```

## Little Text Example

```
    Hey ! I'm a COMMENT in GodEmbed file (file.ge) because 
    I'm not between an opening tag and a closing tag/keyword \o/ 
    (my indentation is conventional)

$author Ghom Krosmonaute 
https://cdn.discordapp.com/embed/avatars/0.png  
https://discordapp.com  
$end 

    The "end" keywords are not mandatory but notament 
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

$timestamp now $end

    The "and" keywords are needed to separate multiline arguments, 
    for example the "name" of a field and its multiline "text".

    You can also write it like this: $&.

$field Titre du premier field $and
Texte du premier field
false

$field Titre du second field
Texte du second field
$end

    At the end of the file, it is optional to add an "end" keyword 
    because it is added automatically by the GodEmbed module.

$footer Texte du footer 
https://cdn.discordapp.com/embed/avatars/0.png
```

### This code gives that

![Result](https://cdn.discordapp.com/attachments/609313381421154304/619976933383602214/unknown.png)

# Links

- [Check the GodEmbed documentation](https://github.com/CamilleAbella/GodEmbed/blob/master/Module/docs.md)
- [Join Discord server support 😄](https://discord.gg/3vC2XWK)
