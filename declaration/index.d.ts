import Router from "@core/router";

declare global {

	export interface Window { router: Router; }

	export type Nullable<T> = T | null;

	export type Keys<T extends Record<string, unknown>> = keyof T;
	export type Values<T extends Record<string, unknown>> = T[Keys<T>];

	export type TProps = Record<string, any>;

	export type Key = keyof Object;

	export type Indexed<T = unknown> = {
		[key in string]: T;
	};
}

declare module '*.png';

export { };
