type StringObject = { [key: string]: string };

export type UnpredictableObject = {
	a: number;
	c: any;
	b?: StringObject;
};

// please create a function with returntype Array<StringObject> | null,  that does the following:
// - takes a minimum of 2 parameters: one parameter is called checkObject and is of type StringObject. The other parameter is of the type UnpredictableObject. (You can assume that the UnpredictableObject
//   can have 0 or 1 arrays somehwere inside of it)
// - finds any array anywhere inside the UnpredictableObject that has xyz as a key. for example, this could be the case:
const obj: UnpredictableObject = {
	a: 22,
	c: {
		xcd: {
			ddffd: {
				xyz: [
					{
						a: 343,
						c: "blabla",
						d: 344,
					},
				],
			},
		},
	},
};

// - if the array is not found, your function returns null
// - if the array is found, it returns a filtered version of the array. The filtered array only has objects
//   that contain all key value pairs that are present inside the StringObject that was provided to your function as a first argument (parameter called checkObject)

function findFilteredArrayWithXyz(
	checkObject: StringObject,
	unpredictableObject: UnpredictableObject
): StringObject[] | null {
	let returnValue: StringObject[] | null = null;

	for (let key in unpredictableObject) {
		const value: any = unpredictableObject[key as keyof UnpredictableObject];
		if (Array.isArray(value) && key === "xyz") {
			const filteredArray = value.filter((item: any) => {
				for (const [key, value] of Object.entries(checkObject)) {
					if (item[key] !== value) {
						return false;
					}
				}
				return true;
			});

			returnValue = filteredArray.length === 0 ? null : filteredArray;
			break;
		}
		if (typeof value === "object") {
			const functionResult: StringObject[] | null = findFilteredArrayWithXyz(
				checkObject,
				value
			);
			if (functionResult !== null) {
				returnValue = functionResult;
				break;
			}
		}
	}

	return returnValue;
}
