import '@styles/globals.css'


export const metadata = {
    title: 'AirSense',
    description : 'An Air Powered Air Quality Monitoring & Prediction System'
}

const layout = ({children}) => {
  return (
    <html lang="en">
        <body className='main'>
            <main className="app">
                {children}
            </main>
        </body>
    </html>
  )
}

export default layout