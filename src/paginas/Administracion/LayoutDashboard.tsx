import { AppSidebar } from '@/components/shared/DashboradSideBar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { memo } from 'react'
import { Link, Outlet, useLocation } from 'react-router'

const LayoutDashboard = memo(() => {

  const seccion = useLocation().pathname.split("/").filter(Boolean)[1] || ""

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex flex-col flex-1'>
        <header className='h-auto w-full'>
          <section className="flex flex-row">
            <div className='h-10 w-10 m-2 flex items-center uppercase'>
              <SidebarTrigger size="lg" variant="default" className='cursor-pointer' />
            </div>
            <div className='h-10 m-2 flex items-center uppercase'>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/dashboard">dashboard</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {seccion && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{seccion}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </section>
          <Separator orientation='horizontal' />
        </header>
        <Outlet />
      </main>
    </SidebarProvider>
  )
})

export default LayoutDashboard