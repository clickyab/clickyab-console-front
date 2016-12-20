export function sync(generator, main, ho) {
	let iterator;
	let result;

	if (typeof generator == 'function') {
		iterator = generator();
	} else {
		iterator = generator;
	}

	if (iterator.then) {
		iterator.then((response) => main.next(response))
	} else {
		result = iterator.next();

		if (result.value.next) {
			result = result.value.next().value;
		}

		if (result.value) {
			if (result.value.then)
				result = result.value;
		}

		if (result.then) {
			result.then((response) => {
				result = iterator.next(response);
				if (result.done) {
					if (main) {
						result = main.next(response);
						if (!result.done) {
							sync(result.value, main)
						}
					}

				} else {
					sync(result.value, iterator);
				}
			});
		} else {
			if (result.value) {
				result = main.next(result.value);
				if (!result.done) {
					sync(result.value, main, true);
				}
			} else {
				iterator.next(result);
			}
		}
	}
}