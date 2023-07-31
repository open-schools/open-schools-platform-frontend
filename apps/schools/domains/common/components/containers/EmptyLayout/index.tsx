import React from 'react'

export const EmptyLayout: React.FC<any> = (props) => {

    const { children } = props

    return (
        <div style={{ width: '100vw', height: '100vh', padding: 'auto' }} {...props}>
            {children}
        </div>
    )
}

export default EmptyLayout
