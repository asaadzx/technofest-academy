export const dialog = {
	content: 'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-full max-w-lg rounded-xl border border-surface-200 bg-white p-6 shadow-xl',
	overlay: 'fixed inset-0 z-40 bg-black/50',
	title: 'text-lg font-semibold text-surface-900',
	description: 'mt-2 text-sm text-surface-500',
	close: 'absolute top-4 right-4 rounded-md p-1 text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors',
	trigger: ''
} as const;

export const dropdown = {
	trigger: 'inline-flex items-center justify-center rounded-md p-1 text-surface-500 hover:text-surface-700 hover:bg-surface-100 transition-colors',
	content: 'z-50 min-w-[12rem] rounded-lg border border-surface-200 bg-white p-1 shadow-lg',
	item: 'relative flex cursor-default items-center rounded-md px-3 py-2 text-sm text-surface-700 outline-hidden select-none data-[highlighted]:bg-surface-100 data-[highlighted]:text-surface-900',
	separator: 'my-1 h-px bg-surface-200',
	label: 'px-3 py-1.5 text-xs font-medium text-surface-500 uppercase tracking-wider',
	checkboxItem: 'relative flex cursor-default items-center rounded-md px-8 py-2 text-sm text-surface-700 outline-hidden select-none data-[highlighted]:bg-surface-100 data-[highlighted]:text-surface-900',
	radioItem: 'relative flex cursor-default items-center rounded-md px-8 py-2 text-sm text-surface-700 outline-hidden select-none data-[highlighted]:bg-surface-100 data-[highlighted]:text-surface-900'
} as const;

export const tabs = {
	list: 'inline-flex h-10 items-center gap-1 rounded-lg bg-surface-100 p-1',
	trigger: 'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-surface-500 transition-all data-[state=active]:bg-white data-[state=active]:text-surface-900 data-[state=active]:shadow-xs outline-hidden',
	content: 'mt-4 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 rounded-md'
} as const;

export const select = {
	trigger: 'flex h-10 w-full items-center justify-between rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
	content: 'z-50 w-full min-w-[8rem] overflow-hidden rounded-lg border border-surface-200 bg-white p-1 shadow-lg',
	item: 'relative flex cursor-default items-center rounded-md px-3 py-2 text-sm text-surface-700 outline-hidden select-none data-[highlighted]:bg-surface-100 data-[highlighted]:text-surface-900',
	value: 'text-surface-900 data-[placeholder]:text-surface-400',
	groupHeading: 'px-3 py-1.5 text-xs font-medium text-surface-500 uppercase tracking-wider'
} as const;
