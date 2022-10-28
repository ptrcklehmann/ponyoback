import '../styles/global.css'
import 'katex/dist/katex.css'
import Footer from '../components/footer'
import { Analytics } from '@vercel/analytics/react'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA257gXNmN3JrhPQQCPVTVHghZ6sBBjU-8',
  authDomain: 'bringbackponyo.firebaseapp.com',
  projectId: 'bringbackponyo',
  storageBucket: 'bringbackponyo.appspot.com',
  messagingSenderId: '960568029472',
  appId: '1:960568029472:web:7f782a82b54cea3ff8a745',
  measurementId: 'G-WTLBS70QVM',
}

// Initialize Firebase
initializeApp(firebaseConfig)

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
      <Analytics />
    </>
  )
}
