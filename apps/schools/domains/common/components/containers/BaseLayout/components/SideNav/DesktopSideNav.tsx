import { Layout } from 'antd'
import React from 'react'

import {useLayoutContext} from "../../BaseLayoutContext";

import {Logo} from "../../../../Logo";
import {ChevronRight} from "../../../../Icons/ChevronRight";
import {ChevronLeft} from "../../../../Icons/ChevronLeft";


export const SIDE_MENU_WIDTH = 256
export const COLLAPSED_SIDE_MENU_WIDTH = 92

interface ISideNavProps {
    onLogoClick?: (...args: any[]) => void
    menuData?: React.ElementType
}

export const DesktopSideNav: React.FC<ISideNavProps> = (props) => {
    const { onLogoClick, menuData } = props
    const { toggleCollapsed, isCollapsed } = useLayoutContext()

    // if (!breakpoints.TABLET_LARGE) {
    //     return null
    // }

    return (
        <>
            <Layout.Sider
                collapsed={isCollapsed}
                theme='light'
                className='menu desktop-menu'
                width={SIDE_MENU_WIDTH}
                collapsedWidth={COLLAPSED_SIDE_MENU_WIDTH}
            >
                <div className='logo-container'>
                    <Logo onClick={onLogoClick} minified={isCollapsed}/>
                </div>
                <div className='expand-button' onClick={toggleCollapsed}>
                    {isCollapsed ? <ChevronRight size='small'/> : <ChevronLeft size='small'/>}
                </div>
                <div className='menu-items-container'>
                    {menuData}
                </div>
            </Layout.Sider>
            <Layout.Sider
                collapsed={isCollapsed}
                width={SIDE_MENU_WIDTH}
                collapsedWidth={COLLAPSED_SIDE_MENU_WIDTH}
            />
        </>
    )
}
