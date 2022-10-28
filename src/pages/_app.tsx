import '../styles/global.css'
import 'katex/dist/katex.css'
import Footer from '../components/footer'
import { Analytics } from '@vercel/analytics/react'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
      <Analytics />
    </>
  )
}
