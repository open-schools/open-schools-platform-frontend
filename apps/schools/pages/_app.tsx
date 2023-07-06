import store from '../store/store'
import '../domains/common/components/styles/global.scss'
import 'antd/dist/antd.css'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { TokenProvider } from './providers/authProvider'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <TokenProvider>
                <Component {...pageProps} />
            </TokenProvider>
        </Provider>
    )
}

export default MyApp
