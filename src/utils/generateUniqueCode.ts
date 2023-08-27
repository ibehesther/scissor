import shortid from "short-uuid";
export const generateUniqueId = () => {
	const code = shortid.generate();
	return code.slice(0, 7);
};
