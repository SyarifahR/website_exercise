import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import 'antd/dist/antd.css';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import TextArea from 'antd/lib/input/TextArea';
import {
  message,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  Upload,
  InputNumber,
  Checkbox,
  Divider,
} from 'antd';
import { type } from 'os';

const props = {
    listType: 'picture',
    previewFile(file) {
      console.log('Your upload file:', file);
      return fetch( {
        method: 'POST',
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
  };

const ContentForm = () => {

    const [fileList, setFileList] = useState([ ]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url ;
        if (!src) {
        src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const [componentDisabled, setComponentDisabled] = useState(true);

    const confirm = () => {
        componentDisabled? 
            message.success('Scroll below for next section.')
            : message.info('Can only proceed by agree with T&C');
    };

    // const { RangePicker } = DatePicker;
    // const newDate = (value, dateString) => {
    //     setBirth(dateString);
    //     return value;
    //     };
    // const onOk = (value) => {
    // console.log('onOk: ', value);
    // };


    ////    Data collection variables  /////
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [website, setWebsite] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [hometown, setHometown] = useState('');
    const [address, setAddress] = useState('');
    const [birth, setBirth] = useState('');
    const [photo, setPhoto] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [certificates, setCertificates] = useState('');
    const [subscription, setSubscription] = useState('');


    return ( 
        <>
            <Head>
                <title>PPT | Form</title>
            </Head>
            <div className={styles.create}>
                <h2 
                    style={{
                        color: "black", 
                        padding: '20px', 
                        fontSize:'16px', 
                        fontWeight: 'bold',
                    }}
                > 
                    Please fill in the form to sign up.
                </h2>

                <Form
                        name="basic"
                        initialValues={{
                        remember: true,
                        }}
                        autoComplete="off"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        style={{
                            paddingTop: '40px', 
                        }}
                    >
                        <Form.Item
                            name="fullName"
                            label="Full Name"
                            value= {fullname}
                            onChange={(e)=>setFullName(e.target.value)}
                            rules={[
                            {
                                required: true,
                                message: "Please enter your name",
                            },
                            { whitespace: true },
                            { min: 3 },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Type your name" />
                        </Form.Item>
                        {/* <p>{fullname}</p> */}

                        <Form.Item
                            name="email"
                            label="Email"
                            value= {email}
                            onChange={(e)=>setEmail(e.target.value)}
                            rules={[
                            {
                                required: true,
                                message: "Please enter your email",
                            },
                            {  type: "email", message: "Please enter a valid email" },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Type your email" />
                        </Form.Item>
                        {/* <p>{email}</p> */}

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                            {
                                required: true,
                            },
                            { min: 6 },
                            {
                                validator: (_, value) =>
                                // value && value.includes("A")
                                value 
                                    ? Promise.resolve()
                                    : Promise.reject("Password does not match criteria."),
                            },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Type your password" />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            dependencies={["password"]}
                            value= {confirmpassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    "Both passwords doesn`t match!"
                                );
                                },
                            }),
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Confirm your password" />
                        </Form.Item>
                        {/* <p>{confirmpassword}</p> */}

                        <Form.Item
                            name="website"
                            label="Website"
                            value= {website}
                            onChange={(e)=>setWebsite(e.target.value)}
                            rules={[{ type: "url", message: "Please enter a valid url" }]}
                            hasFeedback
                        >
                            <Input placeholder="Add your website url" />
                        </Form.Item>
                        {/* <p>{website}</p> */}

                        <Form.Item
                            name="agreement"
                            wrapperCol={{ offset: 12,span: 16, }}
                            valuePropName="checked"
                            // style={{TextAlign: 'center'}}
                            rules={[
                            {
                                validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                        "To proceed, you need to agree with our terms and conditions"
                                    ),
                            },
                            ]}
                        >
                            <Checkbox
                                checked={componentDisabled}
                                onChange={
                                    (e) => setComponentDisabled(e.target.checked === false)
                                    
                                }
                                onClick={confirm}
                            >
                                {" "} Agree to our <a href="#">Terms and Conditions</a>
                            </Checkbox>
                        </Form.Item>
                    </Form>



                    <Form
                        name="basic"
                        initialValues={{
                        remember: true,
                        }}
                        autoComplete="off"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        style={{
                            paddingTop: '40px', 
                        }}
                        disabled={componentDisabled}
                        
                    >
                        <br></br>
                        <Divider style={{padding: '30px'}}>Personal Details</Divider>
                        <br></br>


                        <Form.Item 
                            label="Gender" 
                            name="Gender" 
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                            rules={[{required:true,},]}
                        >
                            <Radio.Group>
                                <Radio value="male"> Male </Radio>
                                <Radio value="female"> Female </Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* <p>{gender}</p> */}

                        <Form.Item
                            name="age"
                            label="Age"
                            value={age}
                            rules={[
                            {
                                type: "number",
                                required: true,
                            },
                            ]}
                        >
                            <InputNumber
                                onChange={(value)=>setAge(value)}
                            />
                        </Form.Item>
                        {/* <p>{age}</p> */}

                        <Form.Item 
                            label="Hometown" 
                            name="Hometown" 
                            value={hometown}
                            rules={[{required:true,},]}
                        >
                            <Cascader
                                onChange={(value)=>setHometown(value)}
                                options={[
                                    {
                                        value: 'Kedah / ',
                                        label: 'Kedah',
                                        children: [
                                            {
                                                value: 'Kota Setar',
                                                label: 'Kota Setar',
                                            },
                                            {
                                                value: 'Langkawi',
                                                label: 'Langkawi',
                                            },
                                            {
                                                value: 'Kuala Muda',
                                                label: 'Kuala Muda',
                                            },
                                            {
                                                value: 'Yan',
                                                label: 'Yan',
                                            },
                                            {
                                                value: 'Sik',
                                                label: 'Sik',
                                            },
                                            {
                                                value: 'Kubang Pasu',
                                                label: 'Kubang Pasu',
                                            },
                                        ],
                                    },
                                    {
                                        value: 'Selangor / ',
                                        label: 'Selangor',
                                        children: [
                                            {
                                                value: 'Gombak',
                                                label: 'Gombak',
                                            },
                                            {
                                                value: 'Petaling',
                                                label: 'Petaling',
                                            },
                                            {
                                                value: 'Klang',
                                                label: 'Klang',
                                            },
                                            {
                                                value: 'Hulu Langat',
                                                label: 'Hulu Langat',
                                            },
                                            {
                                                value: 'Kuala Langat',
                                                label: 'Kuala Langat',
                                            },
                                            {
                                                value: 'Sabak Bernam',
                                                label: 'Sabak Bernam',
                                            },
                                            {
                                                value: 'Sepang',
                                                label: 'Sepang',
                                            },
                                        ]
                                    },
                                    {
                                        value: 'Pahang / ',
                                        label: 'Pahang',
                                        children: [
                                            {
                                                value: 'Pekan',
                                                label: 'Pekan',
                                            },
                                            {
                                                value: 'Kuantan',
                                                label: 'Kuantan',
                                            },
                                            {
                                                value: 'Temerloh',
                                                label: 'Temerloh',
                                            },
                                            {
                                                value: 'Raub',
                                                label: 'Raub',
                                            },
                                            {
                                                value: 'Lipis',
                                                label: 'Lipis',
                                            },
                                            {
                                                value: 'Bera',
                                                label: 'Bera',
                                            },
                                        ],
                                    },
                                    {
                                        value: 'Johor / ',
                                        label: 'Johor',
                                        children: [
                                            {
                                                value: 'Batu Pahat',
                                                label: 'Batu Pahat',
                                            },
                                            {
                                                value: 'Kota Tinggi',
                                                label: 'Kota Tinggi',
                                            },
                                            {
                                                value: 'Kulai',
                                                label: 'Kulai',
                                            },
                                            {
                                                value: 'Kluang',
                                                label: 'Kluang',
                                            },
                                            {
                                                value: 'Johor Bahru',
                                                label: 'Johor Bahru',
                                            },
                                        ],
                                    },
                                    {
                                        value: 'Sabah / ',
                                        label: 'Sabah',
                                        children: [
                                            {
                                                value: 'Kudat',
                                                label: 'Kudat',
                                            },
                                            {
                                                value: 'Kota Kinabalu',
                                                label: 'Kota Kinabalu',
                                            },
                                            {
                                                value: 'Keningau',
                                                label: 'Keningau',
                                            },
                                            {
                                                value: 'Sandakan',
                                                label: 'Sandakan',
                                            },
                                            {
                                                value: 'Tawau',
                                                label: 'Tawau',
                                            },
                                            {
                                                value: 'Victoria',
                                                label: 'Victoria',
                                            },
                                        ],
                                    },
                                    {
                                        value: 'Kelantan / ',
                                        label: 'Kelantan',
                                        children: [
                                            {
                                                value: 'Gua Musang',
                                                label: 'Gua Musang',
                                            },
                                            {
                                                value: 'Kota Bharu',
                                                label: 'Kota Bharu',
                                            },
                                            {
                                                value: 'Pasir Mas',
                                                label: 'Pasir Mas',
                                            },
                                            {
                                                value: 'Tumpat',
                                                label: 'Tumpat',
                                            },
                                            {
                                                value: 'Tanah Merah',
                                                label: 'Tanah Merah',
                                            },
                                            {
                                                value: 'Kuala Krai',
                                                label: 'Kuala Krai',
                                            },
                                        ],
                                    },
                                    {
                                        value: 'Perak / ',
                                        label: 'Perak',
                                        children: [
                                            {
                                                value: 'Batang Padang',
                                                label: 'Batang Padang',
                                            },
                                            {
                                                value: 'Kerian',
                                                label: 'Kerian',
                                            },
                                            {
                                                value: 'Hilir Perak',
                                                label: 'Hilir Perak',
                                            },
                                            {
                                                value: 'Kampar',
                                                label: 'Kampar',
                                            },
                                            {
                                                value: 'Bagan Datuk',
                                                label: 'Bagan Datuk',
                                            },
                                            {
                                                value: 'Muallim',
                                                label: 'Muallim',
                                            },
                                            {
                                                value: 'Kuala Kangsar',
                                                label: 'Kuala Kangsar',
                                            },
                                            {
                                                value: 'Kinta',
                                                label: 'Kinta',
                                            },
                                        ],
                                    },
                                ]}
                            placeholder='Choose your hometown'/>
                        </Form.Item>
                        {/* <p>{hometown}</p> */}

                        <Form.Item 
                            label= 'Address' 
                            name="address" 
                            style={{paddingTop: '10px'}}
                            value={address}
                            onChange={(e)=> setAddress(e.target.value)}
                            rules={[
                                {required:true,},
                            ]}
                        >
                            <TextArea 
                                rows={3} 
                                placeholder='Type your current address' 
                                disabled={componentDisabled}
                            />
                        </Form.Item>
                        {/* <p>{address}</p> */}

                        <Form.Item 
                            label= 'Date of Birth' 
                            name= 'dob'
                            style={{paddingTop: '10px'}}
                            value={birth}
                            rules={[
                                {
                                    required:true,
                                    message: "Please provide your date of birth",
                                },
                            ]}
                            hasFeedback
                        >
                            <DatePicker 
                                onChange={(value, dateString)=>setBirth(dateString)}
                                // onChange={newDate}
                                // showTime 
                                // onOk={onOk} 
                                style={{width: "100%"}}
                                picker='date'
                                placeholder="Choose date of birth"
                            />
                        </Form.Item>
                        {/* <p>{birth}</p> */}

                        <Form.Item
                            label= 'Latest Self Photo (max: 5)' 
                            name= 'photo'
                            style={{paddingTop: '10px'}}
                            rules={[
                                {
                                    required:true,
                                },
                            ]}
                        >
                            <ImgCrop rotate>
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    >
                                    {fileList.length < 5 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>

                        <Form.Item 
                            label= 'Portfolio' 
                            name= 'portfolio'
                            style={{paddingTop: '10px'}}
                        >
                            <Upload 
                                listType="picture-card" 
                                onPreview={onPreview}
                                showUploadList={true}
                            >
                                <div >
                                    <PlusOutlined />
                                    <div style={{marginTop: 8,}}>
                                        Upload
                                    </div>
                                </div>
                            </Upload>
                        </Form.Item>

                        <Form.Item 
                            label= 'Certificates' 
                            name= 'certificates'
                            style={{paddingTop: '10px'}}
                        >
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label= 'Subscription Package' 
                            name= 'package'
                            style={{paddingTop: '10px'}}
                            value={subscription}
                            rules={[
                                {
                                    required:true,
                                },
                            ]}
                        >
                            <Select placeholder='Choose your package'
                                onChange={(value) => setSubscription(value)}
                            >
                                <Select.Option value="6 months">6 months</Select.Option>
                                <Select.Option value="1 year">1 year</Select.Option>
                                <Select.Option value="3 years">3 years</Select.Option>
                                <Select.Option value="5 years">5 years</Select.Option>
                            </Select>
                        </Form.Item>
                        {/* <p>{subscription}</p> */}

                    <Form.Item
                        style={{
                            paddingTop: '100px', 
                            paddingBottom: '10px',
                        }}
                        wrapperCol={{offset: 4,span: 16,}}
                    >
                        <Button 
                            block type= "primary"  
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
     );


}

export default ContentForm;