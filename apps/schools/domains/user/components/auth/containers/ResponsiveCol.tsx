import { Col, ColProps } from 'antd'

export const ResponsiveCol = ({ style, children, ...otherProps }: ColProps) => {
    const modifiedStyle = {
        ...style,
    }

    return (
        <Col style={modifiedStyle} {...otherProps}>
            {children}
        </Col>
    )
}
