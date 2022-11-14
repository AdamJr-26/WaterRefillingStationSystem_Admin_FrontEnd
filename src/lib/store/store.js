import {configureStore} from '@reduxjs/toolkit';
import sideBarState from './sideBarState';
import globalPopupSlice from './globalPopupSlice';
import profileDrawer  from './profileDrawerSlice';

export default  configureStore({
    reducer :{
        sidebarState : sideBarState,
        globalPopupSlice: globalPopupSlice,
        profileDrawer: profileDrawer,
    }
}) 
