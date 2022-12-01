import Link from 'next/link';
import Image from 'next/image';
// import { Form, Switch } from 'antd';

const Navbar = () => {
    return (
      <nav>
        <div className="logo">
          <Image src="/R.png" width={100} height={77} />
          {/* <h1>EXAMPLE</h1> */}
        </div>
        <Link href="/">Home</Link>
        <Link href="/form">Sign-In</Link>
        <Link href="/users">Users</Link>
        <Link href="/antform">( AntForm )</Link>
        {/* <div>
          <Form.Item style={{paddingTop: '10px'}}>
            <Switch />
          </Form.Item>
        </div> */}
      </nav>
  );
  }

  // style={{
  //   color: "white",
  //   backgroundColor: 'purple',
  //   borderRadius: '8px',
  // }}
   
  export default Navbar;