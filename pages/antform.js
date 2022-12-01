import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const props = {
    // action: "/upload.do",
    listType: 'picture',
    previewFile(file) {
      console.log('Your upload file:', file);
      // Your process logic. Here we just mock to the same file
      return fetch( {
        method: 'POST',
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
  };

const FormDisabledDemo  = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const onFormLayoutChange = ({ disabled }) => {
      setComponentDisabled(disabled);
    };

    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]);
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

      const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
      <>
        <div className={styles.usersstyle}>
            <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
            style={{color: "black",padding: '30px', fontSize:'12px', fontWeight: 'bold'}}
            >
            Form disabled
            </Checkbox>
            <Form
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 42,
            }}
            initialValues={{
                remember: true,
            }}
            layout="horizontal"
            onValuesChange={onFormLayoutChange}
            disabled={componentDisabled}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            name="basic"
            >
            <Form.Item label="Chekbox" name="disabled" valuePropName="checked">
                <Checkbox>Checkbox</Checkbox>
            </Form.Item>
            <Form.Item label="Radio">
                <Radio.Group>
                <Radio value="apple"> Apple </Radio>
                <Radio value="pear"> Pear </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Input">
                <Input />
            </Form.Item>
            <Form.Item label="Select">
                <Select>
                <Select.Option value="demo">Demo</Select.Option>
                <Select.Option value="demo2">Demo2</Select.Option>
                <Select.Option value="demo3">Demo3</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="TreeSelect">
                <TreeSelect
                treeData={[
                    {
                    title: 'aaaa',
                    value: 'aaaa',
                    children: [
                        {
                        title: 'AAAAA',
                        value: 'AAAAA',
                        },
                    ],
                    },
                    {
                        title: 'bbbb',
                        value: 'bbbb',
                        children: [
                            {
                            title: 'BBBBB',
                            value: 'bamboo',
                            },
                        ],
                        },
                ]}
                />
            </Form.Item>
            <Form.Item label="Cascader">
                <Cascader
                options={[
                    {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                        {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        },
                    ],
                    },
                ]}
                />
            </Form.Item>
            <Form.Item label="DatePicker">
                <DatePicker />
            </Form.Item>
            <Form.Item label="RangePicker">
                <RangePicker style={{padding: '0px'}} />
            </Form.Item>
            <Form.Item label="InputNumber">
                <InputNumber />
            </Form.Item>
            <Form.Item label="TextArea">
                <TextArea rows={10} />
            </Form.Item>
            <Form.Item label="Switch" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item label="Upload" valuePropName="fileList">
                <Upload listType="picture-card" showUploadList={true}>
                <div>
                    <PlusOutlined />
                    <div
                    style={{
                        marginTop: 8,
                    }}
                    >
                    Upload
                    </div>
                </div>
                </Upload>
            </Form.Item>
            <Form.Item label="Button">
                <Button>Button</Button>
            </Form.Item>
            <Form.Item label="Upload">
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
             <Form.Item label="ImgCrop">
                <ImgCrop rotate>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </Form.Item>
                        <Form.Item label="Upload">
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item
            label="Username"
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your username!',
            },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 12,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
            </Form>
        </div>
      </>
    );
  };
  export default () => <FormDisabledDemo />;