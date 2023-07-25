import React from 'react'

import { DesktopSideNav } from './DesktopSideNav';

interface ISideNav {
    menuData?: React.ElementType
    onLogoClick?: () => void
}

export const SideNav: React.FC<ISideNav> = (props) => {
    const { menuData, onLogoClick } = props

    return (
        // !breakpoints.TABLET_LARGE
        //     ? <MobileSideNav menuData={menuData}/>
        <DesktopSideNav onLogoClick={onLogoClick} menuData={menuData}/>
    )
}
