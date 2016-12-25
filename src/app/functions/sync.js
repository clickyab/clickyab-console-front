export function sync(generator, main) {
	let iterator;
	let result;

	if (typeof generator == 'function') {
		iterator = generator();
	} else if (typeof generator == 'object') {
		iterator = generator;
	} else {
		result = main.next(generator);
		if (!result.done) {
			sync(result.value, main)
		}
	}

	if (!iterator) {
		return;
	}

	if (iterator.then) {
		iterator.then(
			(response) => {
				result = main.next(response);
				if (!result.done) {
					sync(result.value, main);
				}
			},
			error => {
				result = main.next(error);
				if (!result.done) {
					sync(result.value, main);
				}
			}
		);
	} else {
		result = iterator.next();

		if (result.done)
			return true;

		if (result.value.next) {
			result = result.value.next();
			result = result.value;
		}

		if (result.value) {
			if (result.value.then) {
				result = result.value;
			}
		}
		if (result.then) {
			result.then(
				(response) => {
					result = iterator.next(response);
					if (result.done) {
						if (main) {
							result = main.next(response);
							if (!result.done) {
								sync(result.value, main)
							}
						}
					} else {
						if (result.value.next) {
							sync(result.value, iterator);
						} else {
							result = iterator.next(result.value);
							if (!result.done) {
								sync(result.value, main || iterator)
							}
						}
					}
				},
				error => {
					result = iterator.next(error);
					if (result.done) {
						if (main) {
							result = main.next(error);
							if (!result.done) {
								sync(result.value, main)
							}
						}
					} else {
						if (result.value.next) {
							sync(result.value, iterator);
						} else {
							result = iterator.next(result.value);
							if (!result.done) {
								sync(result.value, main || iterator)
							}
						}
					}
				}
			);
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



