import {configureStore} from '@reduxjs/toolkit';
import sideBarState from './sideBarState';
import globalPopupSlice from './globalPopupSlice';
export default  configureStore({
    reducer :{
        sidebarState : sideBarState,
        globalPopupSlice: globalPopupSlice,
    }
}) 
