import { Nav } from '@/components/Nav'
import { Provider } from '@/components/Provider'
import '@/styles/globals.css'

// Meta Data for our website
export const metadata = {
  title: 'Promptopia',
  description: 'Generated by create next app',
}

// Root Layout that will stay constant on every webpage
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <Provider>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
