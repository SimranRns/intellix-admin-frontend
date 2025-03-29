import React, { useState } from 'react'
import Header from '../Dashboard/Header'
import { SidebarInset, SidebarProvider } from '../../src/components/ui/sidebar'
import AppSidebar from '../../src/components/ui/app-sidebar'

const Account = () => {
    return (


        <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        {/* Pass setActivePage to Sidebar */}
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-auto mt-10">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla sapiente necessitatibus molestias, iste hic reiciendis ullam, dicta distinctio dolores impedit, dignissimos odio debitis! Tempora placeat provident ea sunt iure quibusdam, soluta doloremque sit nemo et veritatis obcaecati nesciunt iste cum! Tempore, totam. Itaque, officia nemo, cum explicabo cupiditate placeat, beatae totam doloribus numquam similique voluptatibus? Necessitatibus sunt impedit facilis! Reiciendis, dolore eaque. Cupiditate a iste ad commodi ipsum, sequi labore excepturi dignissimos odit assumenda iusto quaerat, explicabo autem eaque. Enim fuga asperiores repellat laudantium perspiciatis mollitia aspernatur vitae! Eius odit culpa in ad fuga, voluptatibus repudiandae amet reprehenderit et perspiciatis.</p>
          </main>
                </SidebarInset>
        </SidebarProvider>
    )
}

export default Account
