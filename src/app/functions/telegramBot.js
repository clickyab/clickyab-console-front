export function telegramBot() {
	var NODE_ENV = process.env.NODE_ENV;
    return require('./../../../.env').webpack.telegramBot;
}