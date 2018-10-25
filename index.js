const puppeteer = require('puppeteer')
const Discord = require('discord.js')
const client = new Discord.Client()

const grabPage = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('https://youtube.com')
	const el = await page.$('#contents')
	const buffer = await el.screenshot({ path: `${Date.now()}.png` })

	await browser.close()
	return buffer
}

client.on('ready', () => {
	console.log('I am ready!')
})

client.on('message', async message => {
	// If the message is "how to embed"
	if (message.content === 'testme') {
		console.log('message matches, fetching')
		// We can create embeds using the MessageEmbed constructor
		// Read more about all that you can do with the constructor
		// over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
		const buffer = await grabPage()
		const embed = new Discord.RichEmbed()
			// Set the title of the field
			.setTitle('A slick little embed')
			// Set the color of the embed
			.setColor(0xff0000)
			// Set the main content of the embed
			.setDescription('Hello, this is a slick embed!')
			.attachFile(buffer)
		console.log('message sent')
		// Send the embed to the same channel as the message
		message.channel.send(embed)
	}
})

client.login('BOT TOKEN GOES HERE')
