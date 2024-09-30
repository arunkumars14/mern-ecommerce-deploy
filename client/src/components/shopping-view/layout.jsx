import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'

function ShoppingLayout() {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <div className="flex flex-col bg-white overflow-hidden">
        <ShoppingHeader open={openSidebar} setOpen={setOpenSidebar}/>
        <main className="flex flex-col w-full">
            <Outlet />
        </main>
    </div>
  )
}

export default ShoppingLayout
