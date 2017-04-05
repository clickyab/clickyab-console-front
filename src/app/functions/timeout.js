export function timeout(timeOut) {
	return () => new Promise((resolve) => {
		setTimeout(function () {
			resolve("ok")
		}, timeOut)
	})
}