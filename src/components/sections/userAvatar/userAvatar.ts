
// Handlers
// Types
import { TState } from '../../../core/store';
import { IUser } from '../../../types';
import { API_RESOURCES_PATH } from '../../../utils/constants';
import Avatar from '../../ui/avatar';
import { IconMedia } from '../../ui/icon';
import Image from '../../ui/image';

export const ProfileUserAvatar = (state: TState) => {
	if (Object.keys(state).length !== 0 && (Boolean(state.user))) {
		if ((state.user as IUser).avatar != null) {
			return new Avatar({
				size: 'lg',
				data: new Image({
					src: API_RESOURCES_PATH + (state.user as IUser).avatar,
				}),
			});
		}
		return new Avatar({
			size: 'lg',
			data: new IconMedia({
				color: 'icon-white',
				size: 'icon-xxl',
			}),
		});
	}

};
