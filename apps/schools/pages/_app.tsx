import store from '../redux/store'
import '../domains/common/components/styles/global.scss'
import 'antd/dist/antd.css'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import React, { PropsWithChildren } from 'react'

export interface ContainerPage<PropsType> extends React.FC {
    container: React.FC<PropsType>
}

interface CustomAppProps extends AppProps {
    Component: ContainerPage<PropsWithChildren>
}

function MyApp({ Component, pageProps }: CustomAppProps): JSX.Element {
    const LayoutComponent = Component.container || <div /> //BaseComponent

    return (
        <Provider store={store}>
            <LayoutComponent>
                <Component {...pageProps} />
            </LayoutComponent>
        </Provider>
    )
}

export default MyApp
