import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 px-10">
      <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 text-gray-600 text-xs">
        <p>
          &copy; {new Date().getFullYear()} Kaffah Information App. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer