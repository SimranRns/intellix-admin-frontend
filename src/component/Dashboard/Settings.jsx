import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Header from './Header';

const Settings = () => {
  const [tab, setTab] = useState(1);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:block overflow-y-auto scrollbar-hide">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        <Header />
        <Disclosure as="nav" className="bg-white shadow">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center w-full">
                  <div className="md:flex md:space-x-4">
                    <button
                    onClick={()=>{setTab(1)}}
                 
                      className={`rounded-md px-3 py-2 text-sm font-medium ${tab === 1 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                    >
                      View Profile
                    </button>
                    <button
                    onClick={()=>{setTab(2)}}
               
                      className={`rounded-md px-3 py-2 text-sm font-medium ${tab === 2 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
        <div className="p-6 flex-1" style={{display:tab===1?"block":"none"}}>
          <h1 className="text-2xl font-semibold text-gray-800">Profile Page</h1>
          <p className="text-gray-600 mt-2">Customize your preferences here.</p>
        </div>
        <div className="p-6 flex-1" style={{display:tab===2?"block":"none"}}>
          <h1 className="text-2xl font-semibold text-gray-800">Change Password Page</h1>
          <p className="text-gray-600 mt-2">Customize your preferences here.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
