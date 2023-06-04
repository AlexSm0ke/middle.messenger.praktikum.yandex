import { IChatUser } from "../types";

export const sortUserByLogin = (
	activeChatUsers: IChatUser[]
) => {
	activeChatUsers.sort((a: IChatUser, b: IChatUser) => {
		const loginA = a.login.toUpperCase();
		const loginB = b.login.toUpperCase();
		if (loginA < loginB) return -1;
		if (loginA > loginB) return 1;
		return 0;
	});
};
