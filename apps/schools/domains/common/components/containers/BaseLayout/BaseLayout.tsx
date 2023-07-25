import { Layout, PageHeader as AntPageHeader, PageHeaderProps } from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem'
import classnames from 'classnames'
import Router from 'next/router'

import React, {CSSProperties, FunctionComponent, ElementType, PropsWithChildren} from 'react'

import styles from './styles/styles.module.scss'
import { SideNav } from './components/SideNav'
import { ITopMenuItemsProps } from './components/TopMenuItems'
// import { Header } from './Header'
import 'antd/dist/antd.less'
import '@open-condo/ui/dist/styles.min.css'
import { useLayoutContext } from './BaseLayoutContext'

interface IBaseLayoutProps extends Omit<PropsWithChildren, 'type'> {
    headerAction?: ElementType<unknown>
    style?: CSSProperties
    className?: string
    menuDataRender?: () => MenuItem[]
    TopMenuItems?: React.FC<ITopMenuItemsProps>
    logoLocation?: string
    menuData?: React.ElementType
    onLogoClick?: () => void
}

const BaseLayout: React.FC<IBaseLayoutProps> = (props) => {
    const {
        style,
        children,
        className,
        menuData,
        headerAction,
        onLogoClick = () => Router.push('/'),
        TopMenuItems,
    } = props

    return (
        <Layout className={`${className} ${styles.LAYOUT_CSS}`} style={style}>
            <SideNav menuData={menuData} onLogoClick={onLogoClick}/>
            <Layout className={styles.SUB_LAYOUT_CSS}>
                {/*<Header headerAction={headerAction} TopMenuItems={TopMenuItems} />*/}
                {children}
            </Layout>
        </Layout>
    )
}

interface IPageWrapperProps extends Omit<PropsWithChildren, 'type'> {
    className?: string
    style?: CSSProperties
}

const PageWrapper: FunctionComponent<IPageWrapperProps> = (props) => {
    const { children, className, style } = props

    return (
        <Layout.Content className={classnames('page-wrapper', styles.StyledPageWrapper, className)} style={style}>
            {children}
        </Layout.Content>
    )
}

interface IPageHeaderProps extends PageHeaderProps {
    title?: React.ReactChild
    subTitle?: string
    className?: string
    style?: CSSProperties
    spaced?: boolean
}

const PageHeader: FunctionComponent<IPageHeaderProps> = ({
    children,
    className,
    style,
    title,
    subTitle,
    spaced,
    ...pageHeaderProps
}) => {
    return (
        <AntPageHeader
            className={classnames('page-header', className, spaced ? styles.SPACED_PAGE_HEADER_CSS : styles.PAGE_HEADER_CSS)} style={style}
            title={title} subTitle={subTitle}
            {...pageHeaderProps}
        >
            {children}
        </AntPageHeader>
    )
}

interface IPageContentProps extends Omit<PropsWithChildren, 'type'> {
    className?: string
    style?: CSSProperties
}

const PageContent: FunctionComponent<IPageContentProps> = ({ children, className, style }) => {
    return (
        <div className={classnames('page-content', className, styles.PAGE_CONTENT_CSS)} style={style}>
            {children}
        </div>
    )
}

const TablePageContent: FunctionComponent<IPageContentProps> = ({ children, className, style }) => {
    return (
        <div className={classnames('page-content', className, styles.TABLE_PAGE_CONTENT_CSS)} style={style}>
            {children}
        </div>
    )
}

export default BaseLayout
export {
    useLayoutContext,
    PageWrapper,
    PageHeader,
    PageContent,
    TablePageContent,
}
