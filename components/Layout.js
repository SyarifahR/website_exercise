import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from '../styles/Home.module.css'

const Layout = ({children}) => {
    return ( 
        <div className="content" style={{
            backgroundColor: '#f9f0ff',
          }}>
            <Navbar />
                {children}
            <Footer />
        </div>
     );
}
 
export default Layout;