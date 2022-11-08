import '~/styles/globals.css'

import clsx from 'clsx'
import type { AppType } from 'next/app'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={clsx(['min-h-screen'])}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
