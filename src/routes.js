import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Index from './pages/index';
import Main from './pages/main';

export default createAppContainer(
    createSwitchNavigator({
        Index,
        Main,
    })
)