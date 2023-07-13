import store from '../store/store'
import '../domains/common/components/styles/global.scss'
import 'antd/dist/antd.css'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { AuthProvider } from '../domains/user/providers/authProvider'
import React, { PropsWithChildren } from 'react'
import { IAuthLayoutProps } from '../domains/user/components/auth/containers/AuthLayout'

export interface ContainerPage<PropsType> extends React.FC {
    container: React.FC<PropsType>
}

interface CustomAppProps extends AppProps {
    Component: ContainerPage<PropsWithChildren>
}

const BaseLayout: React.FC<IAuthLayoutProps> = (props) => {
    const { children, ...otherProps } = props

    return <>{children}</>
}

function MyApp ({ Component, pageProps }: CustomAppProps): JSX.Element {
    const LayoutComponent = Component.container || BaseLayout //BaseComponent

    return (
        <Provider store={store}>
            <AuthProvider>
                <LayoutComponent>
                    <Component {...pageProps} />
                </LayoutComponent>
            </AuthProvider>
        </Provider>
    )
}

export default MyApp
