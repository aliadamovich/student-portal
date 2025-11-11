import React from 'react'
import { render, renderHook } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

import { setupStore, type AppStore, type RootState } from '../app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

type ExtendedRenderOptions = Omit<RenderOptions, 'queries'> & {
	preloadedState?: Partial<RootState>
	store?: AppStore
}

export function createWrapper(preloadedState?: Partial<RootState>, store?: AppStore) {
	const appStore = store ?? setupStore(preloadedState)
	const Wrapper = ({ children }: { children: React.ReactNode }) => (
		<Provider store={appStore}>
			<BrowserRouter>{children}</BrowserRouter>
		</Provider>
	)
	return { Wrapper, store: appStore }
}

// for components
export function renderWithProviders(
	ui: React.ReactElement,
	{ preloadedState, store, ...renderOptions }: ExtendedRenderOptions = {}
) {
	const { Wrapper, store: appStore } = createWrapper(preloadedState, store)
	return { store: appStore, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// for hooks
export function renderHookWithProviders<T>(
	hook: () => T,
	{ preloadedState, store, ...renderOptions }: ExtendedRenderOptions = {}
) {
	const { Wrapper, store: appStore } = createWrapper(preloadedState, store)
	return { store: appStore, ...renderHook(hook, { wrapper: Wrapper, ...renderOptions }) }
}
