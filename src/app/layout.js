"use client"

import './globals.css'
import SessionProvider from "../../SessionProvider"
import { useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'


// export const metadata = {
//   title: 'Examcell SIES GST',
// }

export default function RootLayout({ children }) {
  const [admin, setAdmin] = useState(false)

  return (
    <html lang="en">
      <body>
        {/* <SessionProvider> */}
        <AuthContext.Provider value={{ admin, setAdmin }}>
          {children}
        </AuthContext.Provider>
        {/* </SessionProvider> */}

      </body>
    </html>
  )
}
