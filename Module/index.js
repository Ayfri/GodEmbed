const {
	processors,
	tags,
	regexString,
} = require('./engines.js');
const {MessageEmbed} = require('discord.js');

function toEmbed(string) {
	
	let source = string.replace(/[^:]\$blank/ig, '\u200B') + '\n$end';
	
	const embed = new MessageEmbed();
	const errors = [];
	
	// Pour chaque balise existente
	for (let tag in tags) {
		
		const {
			args,
			method,
		} = tags[tag];
		const types = args.map(arg => arg.replace('?', ''));
		const regex = new RegExp(regexString.replace('@tag', tag), 'im');
		
		// Pour chaque occurence de cette balise
		while (regex.test(source)) {
			
			let argContents;
			const logArgs = [];
			const valides = [];
			const andTagRegex = /\s+\$(?:and|&)\s+/i;
			let [_, content] = regex.exec(source);
			
			// Effacer la balise traitée de "source"
			source = source.replace(new RegExp(`(?:^|\\s)\\$${tag}(?:$|\\s)`, 'i'), ' $end ');
			content = content.trim();
			
			argContents = args.length === 1 ? [content] : andTagRegex.test(content) ? content.split(andTagRegex) : content.split(/\s*[\r\n]+\s*/);
			
			// Pour chaque argument demandé par la méthode
			types.forEach((type, index) => {
				
				const fullArg = args[index];
				let arg = argContents[index];
				
				// Si l'argument n'est pas null ou "null"
				if (arg && !/^\$null$/i.test(arg)) {
					
					// Convertir l'argument
					const valid = processors[type](arg);
					
					// Injection de validité
					if (valid === 'invalid') {
						logArgs.push('invalid: ' + type);
					} else {
						logArgs.push('valid: ' + type);
						valides[index] = valid;
					}
				} else {
					
					// Injection de nullité
					if (fullArg.startsWith('?')) {
						logArgs.push('omit: ' + type);
						valides[index] = null;
					} else {
						logArgs.push('forget: ' + type);
						valides[index] = 'GodArgumentError';
					}
				}
			});
			
			// Si les arguments obligatoires sont présents
			if (!valides.find((arg) => arg === 'GodArgumentError')) {
				// Ajouter les arguments à l'embed
				embed[method](...valides);
				
				// Sinon
			} else {
				// Ajouter une erreur dans le log d'erreurs
				errors.push(`Missing argument(s): ${method}( ${logArgs.join(', ')} )`);
			}
		}
	}
	
	return {
		embed:  embed,
		errors: errors,
	};
}

module.exports = toEmbed;
