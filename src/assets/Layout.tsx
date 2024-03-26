import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from 'react-router'
import { Toaster } from '@/components/ui/sonner'

export default function Layout() {
  return (
    <div className='flex flex-col h-[100svh]'>
      <Toaster />
      <Header />
      <div className='flex-grow'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
