import React, { useState } from 'react';
import { Form, Select, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

function AddServices() {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const addRequest = async (values) => {
    setLoading(true);

    const { serviceField, description, price, serviceName } = values;
    const formData = new FormData();

    formData.append('field', serviceField);
    formData.append('des', description);
    formData.append('price', price);
    formData.append('serviceName', serviceName);

    if (fileList[0]) {
      formData.append('image', fileList[0].originFileObj);
    }

    try {
      const response = await fetch('http://localhost:5001/api/add/services', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        message.success('Service added successfully!');
      } else {
        message.error('Failed to add service');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Add a New Service</h2>
      <Form layout="vertical" onFinish={addRequest}>
        <Form.Item
          label="Service Field"
          name="serviceField"
          rules={[{ required: true, message: 'Please select a service field!' }]}
        >
          <Select placeholder="Select service field">
            {['Electrician', 'Plumber', 'Painter', 'Carpenter'].map((item) => (
              <Option key={item} value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Service Name"
          name="serviceName"
          rules={[{ required: true, message: 'Please enter service name!' }]}
        >
          <Input placeholder='Add Service Name'/>
        </Form.Item>

        <Form.Item
          label="Service Description"
          name="description"
          rules={[{ required: true, message: 'Please enter description!' }]}
        >
          <Input.TextArea rows={4} placeholder='Add Description' />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter price!' }]}
        >
          <Input type="number" placeholder='Add Service Price' />
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList)}
            fileList={fileList}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>

        <Button className='ml-[89%] p-6' type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddServices;
