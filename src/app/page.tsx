import Image from 'next/image'
import HeroHeader from '@components/HeroHeader'
import PlatformTabs from '@components/PlatformTabs'

const Home = () => (
  <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-8 items-center w-full max-w-screen-xl mx-auto">
      <HeroHeader />
      <PlatformTabs />
    </main>
  </div>
)

export default Home
