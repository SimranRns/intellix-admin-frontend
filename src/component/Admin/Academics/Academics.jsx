import React, { useState } from 'react'
import Header from '../Dashboard/Header'
import { SidebarInset, SidebarProvider } from '../../src/components/ui/sidebar'
import AppSidebar from '../../src/components/ui/app-sidebar'

const Academics = () => {
    return (


        <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        {/* Pass setActivePage to Sidebar */}
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-auto mt-10">
          
          </main>
                </SidebarInset>
        </SidebarProvider>
    )
}

export default Academics
