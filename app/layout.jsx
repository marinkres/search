import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Footer from "@components/Footer";

export const metadata = {
  title: "Poseri se",
  description: "Poseri se posteno",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <div className='app' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Nav />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </div>
      </Provider>
    </body>
  </html>
);

export default RootLayout;