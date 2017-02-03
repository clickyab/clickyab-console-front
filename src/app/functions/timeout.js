export function timeout(timeOut) {
	return () => new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve("ok")
		}, timeOut)
	})
}