import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApi'
import { authReducer } from 'features/auth/model/authSlice'
import { useSelector, type TypedUseSelectorHook } from 'react-redux'

const rootReducer = combineReducers({
	auth: authReducer,
	[baseApi.reducerPath]: baseApi.reducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
	})
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
