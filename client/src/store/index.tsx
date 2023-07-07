import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import languageReducer from '../features/language/languageSlice'
import templateVersionReducer from '../features/templateVersion/templateVersionSlice'
import sharedVariantReducer from '../features/SharedVariant/sharedVariantSlice'
import configureReducer from '../features/Configure/configureSlice'
import elementReducer from '../features/Configure/configureSlice'
import doneReducer from '../features/Done/doneSlice'
// v3
import uploadReducer from '../features/v3/Upload/uploadSlice'
import templateReducer from '../features/v3/Template/templateSlice'
import languageReducerv3 from '../features/v3/Language/languageSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    templateVersion: templateVersionReducer,
    sharedVariant: sharedVariantReducer,
    configure: configureReducer,
    element: elementReducer,
    done: doneReducer,
    // v3
    upload: uploadReducer,
    template: templateReducer,
    languagev3: languageReducerv3,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
