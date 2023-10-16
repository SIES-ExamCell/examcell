import './globals.css'
import SessionProvider from "../../SessionProvider"


export const metadata = {
  title: 'Examcell SIES GST',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>
        {/* <SessionProvider> */}
          {children}
        {/* </SessionProvider> */}

      </body>
    </html>
  )
}
