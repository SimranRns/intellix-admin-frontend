import React, { useState } from 'react'
import Header from '../Dashboard/Header'
import { SidebarInset, SidebarProvider } from '../../src/components/ui/sidebar'
import AppSidebar from '../../src/components/ui/app-sidebar'

const Account = () => {
    return (


        <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
            {/* Pass setActivePage to Sidebar */}
            <AppSidebar />
            
                <Header />
                <main className="flex-1 overflow-auto p-6 mt-16">
                    <p>lorem1000</p>
                </main>
        </SidebarProvider>
    )
}

export default Account
