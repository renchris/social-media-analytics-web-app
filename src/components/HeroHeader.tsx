import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

const charlea = localFont({
  src: '../app/fonts/CharleaBlack.ttf',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const HeroHeader = () => (
  <div className="flex flex-col items-center justify-center text-center py-20">
    <h1 className={`${charlea.className} text-7xl`}>
      NewForm
    </h1>
    <p className={`${inter.className} text-lg font-light`}>
      Social Media Analytics
    </p>
  </div>
)

export default HeroHeader
