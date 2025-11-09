import React, { type JSX } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

import { setupStore, type AppStore, type RootState } from '../app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: Partial<RootState>
	store?: AppStore
}

export function renderWithProviders(
	ui: React.ReactElement,
	{ preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
		return (
			<Provider store={store}>
				<BrowserRouter>{children}</BrowserRouter>
			</Provider>
		)
	}
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
