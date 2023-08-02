import React, { FunctionComponent } from 'react'
import classnames from 'classnames'
import { HTMLAttributes } from 'react'

interface IPageContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'type'> {
    children?: React.ReactElement
    className?: string
}

export const PageContent: FunctionComponent<IPageContentProps> = ({ children, className, ...restProps }) => {
    return (
        <div className={classnames('pageContent', className)} {...restProps}>
            {children}
        </div>
    )
}
