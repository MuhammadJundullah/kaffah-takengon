import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 sm:px-10">
      <div className="mx-auto px-5 sm:py-7 py-3 sm:px-6 lg:px-8 text-gray-600 dark:text-white text-xs">
        <p>
          &copy; {new Date().getFullYear()} Kaffah Information App. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer