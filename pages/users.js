import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import 'antd/dist/antd.css';
import { Button, Table, Modal, Input, Form, InputNumber, Popconfirm, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
  

const Users = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((_, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            setSelectedRowKeys(newSelectedRowKeys);
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((_, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            setSelectedRowKeys(newSelectedRowKeys);
          },
        },
      ],
    };

    // const [isEditing, setIsEditing] = useState(false);
    // const [editingStudent, setEditingStudent] = useState(null);
    // const [dataSource, setDataSource] = useState([
    //   {
    //     key: 1,
    //     name: `Edrward 1`,
    //     age: 32,
    //     address: `London Park no. 1`,
    //   },
    //   {
    //     key: 2,
    //     name: `Edrward 2`,
    //     age: 32,
    //     address: `London Park no. 2`,
    //   },
    // ]);

    // const columns = [
    //   {
    //     title: 'Full Name',
    //     width: 100,
    //     dataIndex: 'name',
    //     key: 'name',
    //     fixed: 'left',
    //   },
    //   {
    //     title: 'Age',
    //     width: 100,
    //     dataIndex: 'age',
    //     key: 'age',
    //   },
    //   {
    //     title: 'Column 1',
    //     dataIndex: 'address',
    //     key: '1',
    //     width: 150,
    //   },
    //   {
    //     title: 'Column 2',
    //     dataIndex: 'address',
    //     key: '2',
    //     width: 150,
    //   },
    //   {
    //     title: 'Column 3',
    //     dataIndex: 'address',
    //     key: '3',
    //     width: 150,
    //   },
    //   {
    //     title: 'Column 4',
    //     dataIndex: 'address',
    //     key: '4',
    //     width: 150,
    //   },
    //   {
    //     title: 'Column 5',
    //     dataIndex: 'address',
    //     key: '5',
    //     width: 150,
    //   },
    //   {
    //     title: 'Column 6',
    //     dataIndex: 'address',
    //     key: '6',
    //     width: 150,
    //   },
    //   {
    //     title: 'Column 7',
    //     dataIndex: 'address',
    //     key: '7',
    //     width: 150,
    //   },
    //   {
    //     title: 'Column 8',
    //     dataIndex: 'address',
    //     key: '8',
    //   },
    //   {
    //     title: 'Actions',
    //     key: 'operation',
    //     fixed: 'right',
    //     width: 100,

    //     render: (record) => {
    //       return (
    //         <>
    //           <EditOutlined
    //             onClick={() => {
    //               onEditStudent(record);
    //             }}
    //           />
    //           <DeleteOutlined
    //             onClick={() => {
    //               onDeleteStudent(record);
    //             }}
    //             style={{ color: "red", marginLeft: 12 }}
    //           />
    //         </>
    //       );
    //     },
    
    //   },
    // ];

    // const onDeleteStudent = (record) => {
    //   Modal.confirm({
    //     title: "Are you sure, you want to delete this student record?",
    //     okText: "Yes",
    //     okType: "danger",
    //     onOk: () => {
    //       setDataSource((pre) => {
    //         return pre.filter((user) => user.key !== record.key);
    //       });
    //     },
    //   });
    // };
    // const onEditStudent = (record) => {
    //   setIsEditing(true);
    //   setEditingStudent({ ...record });
    // };
    // const resetEditing = () => {
    //   setIsEditing(false);
    //   setEditingStudent(null);
    // };


    const originData = [];
    for (let i = 0; i < 10; i++) {
      originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {
      const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const deleteRow =(key) => {
    setData((pre) => {
      return pre.filter((user) => user.key !== key);
    });
  };
    // const onDeleteStudent = (record) => {
    //   Modal.confirm({
    //     title: "Are you sure, you want to delete this student record?",
    //     okText: "Yes",
    //     okType: "danger",
    //     onOk: () => {
    //       setDataSource((pre) => {
    //         return pre.filter((user) => user.key !== record.key);
    //       });
    //     },
    //   });
    // };
    // const onEditStudent = (record) => {
    //   setIsEditing(true);
    //   setEditingStudent({ ...record });
    // };
    // const resetEditing = () => {
    //   setIsEditing(false);
    //   setEditingStudent(null);
    // };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '14%',
      fixed: 'left',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '10%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '14%',
      editable: true,
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      width: '14%',
      editable: true,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      width: '14%',
      editable: true,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      width: '14%',
      editable: true,
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      width: '14%',
      editable: true,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      width: '14%',
      editable: true,
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      width: '14%',
      editable: true,
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      width: '14%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '11%',
      fixed: 'right',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : 
        (
        <span>
          <Typography.Link style={{marginRight: 8,}} disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          <Popconfirm  title="Sure to cancel?" onConfirm={()=>deleteRow(record.key)} okType="danger">
              <a style={{color: "red",}} >Delete</a>
            </Popconfirm>
        </span>
        );
      },
    },
  ]; 

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const checkBoxed = () => {
    <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={data}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                  }}
                  rowSelection={rowSelection}
                  scroll={{x: 1800,y: 300,}}
                  // title={() => 'Header'} 
                  // footer={() => 'Footer'}
                />
  }


    return ( 
        <>
            <Head>
                <title>PPT | Users</title>
            </Head>
            {/* <div className={styles.usersstyle}> */}
            <div className={styles.tablestyle}>
                <h2>Users </h2>
                <p>details.......</p>
                <br />

                {/* <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} scroll={{x: 1500,y: 300,}}  title={() => 'Header'} footer={() => 'Footer'}/>
                <Modal
                  title="Edit Student"
                  visible={isEditing}
                  okText="Save"
                  onCancel={() => {
                    resetEditing();
                  }}
                  onOk={() => {
                    setDataSource((pre) => {
                      return pre.map((user) => {
                        if (user.key === editingStudent.key) {
                          return editingStudent;
                        } else {
                          return user;
                        }
                      });
                    });
                    resetEditing();
                  }}
                >
                  <Input
                    value={editingStudent?.name}
                    onChange={(e) => {
                      setEditingStudent((pre) => {
                        return { ...pre, name: e.target.value };
                      });
                    }}
                  />
                  <Input
                    value={editingStudent?.age}
                    onChange={(e) => {
                      setEditingStudent((pre) => {
                        return { ...pre, age: e.target.value };
                      });
                    }}
                  />
                  <Input
                    value={editingStudent?.address}
                    onChange={(e) => {
                      setEditingStudent((pre) => {
                        return { ...pre, address: e.target.value };
                      });
                    }}
                  />
                </Modal> */}

                <Form form={form} component={false} >
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={data}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                  }}
                  // rowSelection={rowSelection}
                  scroll={{x: 1800,y: 300,}}
                  // title={() => 'Header'} 
                  // footer={() => 'Footer'}
                />
                </Form>

            </div>
        </>
     );
}
 
export default Users;