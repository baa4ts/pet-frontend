import { AppSidebar } from '@/components/shared/DashboradSideBar'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'

const LayoutDashboard = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex flex-col flex-1'>
        <header className='h-auto w-full'>
          <div className='h-10 w-10 m-2 flex items-center uppercase'>
            <SidebarTrigger size="lg" variant="default" className='cursor-pointer' />
          </div>
          <Separator orientation='horizontal' />
        </header>
        <section className='m-2 flex flex-col flex-1'>
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  )
}

export default LayoutDashboard