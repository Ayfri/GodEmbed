
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
const godEmbed = require("godembed")
const {Client,RichEmbed} = require("discord.js")

client.on("message", message => {
    if(message.content && message.channel){
        const {embed,logs} = toEmbed(message.content)
        message.channel.send({
            content : "GodEmbed logs```\n"+logs+"\n```",
            embed : embed
        })
    }
})
```

## Use GodEmbed langage

All parts of a RichEmbed are definable from the GodEmbed language. 

### Example

When you type :

```
$author Ghom Krosmonaute  
-img https://cdn.discordapp.com/embed/avatars/0.png  
-url https://discordapp.com  
$end  
```

> The "end" are not mandatory but strongly recommended, notament to be able to comment between two elements.

```
$title Voici le titre !

$logo https://cdn.discordapp.com/embed/avatars/0.png

$image https://cdn.discordapp.com/embed/avatars/0.png

$url https://discordapp.com

$description 
Et biensûr la description qui comme 
le titre peut faire plusieur lignes !
$end 

$color 0xFF0000 $end
```

> Colors can only be given in hexadecimal and only in the Number form.  

```
$timestamp now $end 
```

> The timestamp can be defined by a <timestamp> but it can also be defined with "now" as above.

```
$field Titre du premier field
Texte du premier field
-inline
$end

$field Titre du second field 
Texte du second field
$end

$footer Texte du footer 
-img https://cdn.discordapp.com/embed/avatars/0.png
$end
```

You obtain :

![Result](https://cdn.discordapp.com/attachments/609313381421154304/619976933383602214/unknown.png)

## Join Discord server support 😄

<iframe src="https://discordapp.com/widget?id=507389389098188820&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>

![[Join Discord server support](https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjVt8S7tr_kAhVEhxoKHQAHCAIQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F2308078%2Fdiscord_logo_website_icon&psig=AOvVaw0UYg4lQ6Hne681Mu9svv_l&ust=1567970234342338)](https://discord.gg/7VEq4DE)