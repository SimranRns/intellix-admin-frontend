import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Header from './Header';

const navigationItems = [
  { name: 'View Profile', href: '#', id: 'view-profile' },
  { name: 'Change Password', href: '#', id: 'change-password' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Settings = () => {
  const [activeItem, setActiveItem] = useState('view-profile');

  return (
    <div className="flex h-screen bg-gray-100">
    
      <div className="hidden md:block overflow-y-auto scrollbar-hide">
        <Sidebar />
      </div>
      <div>
        
      </div>

      <div className="flex flex-col flex-1">
        <div>
          <Header/>
        </div>
        <Disclosure as="nav" className="bg-white shadow">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center w-full">

                  <div className="flex items-center ml-auto md:hidden">
                    <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-200">
                      <span className="sr-only">Toggle menu</span>
                      {open ? (
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </DisclosureButton>
                  </div>
                  <div className="hidden md:flex md:space-x-4">
                    {navigationItems.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={() => setActiveItem(item.id)}
                        className={classNames(
                          activeItem === item.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <DisclosurePanel className="md:hidden bg-white shadow-md p-4">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setActiveItem(item.id)}
                      className={classNames(
                        activeItem === item.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white',
                        'block rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
        <div className="p-6 flex-1">
          <h1 className="text-2xl font-semibold text-gray-800">Settings Page</h1>
          <p className="text-gray-600 mt-2">Customize your preferences here.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
