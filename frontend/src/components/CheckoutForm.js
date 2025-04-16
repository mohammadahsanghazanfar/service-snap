import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Radio, notification } from "antd";
import { useDispatch } from "react-redux";
import { userActions } from "../store";
function CheckoutForm({ showModal, handleClose, user, cartItems, totalPrice }) {
  const [form] = Form.useForm();
  
  const dispatch=useDispatch()
  // Set form values when the modal is opened
  useEffect(() => {
    if (showModal) {
      form.setFieldsValue({
        username: user?.username || "",
        email: user?.email || "",
        location: user?.area || "",
        address: "",
        mobile: "",
        paymentMethod: "cash",
      });
    }
  }, [showModal, user]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); // Validate the form before submission
      const { address,mobile } = values;


      const response = await fetch("http://localhost:5001/api/cashOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          area: user.area,
          price: totalPrice,
          services: cartItems,
          address,
          mobile,
        }),
      });

      const data = await response.json();

      if (data.success === "true") {
        notification.success({
          message: "Success",
          description: "Order placed successfully!",
        });
        dispatch(userActions.resetItems());
        form.resetFields();
        handleClose();
         
       // Close modal after submission
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      notification.error({
        message: "Error",
        description: "Failed to place order. Please try again.",
      });
    }
  };

  return (
    <Modal
      title="Order Details"
      open={showModal}
      onCancel={handleClose}
      centered
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Username" name="username">
          <Input readOnly />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input readOnly />
        </Form.Item>

        <Form.Item label="Location" name="location">
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter your full address" }]}
        >
          <Input placeholder="Enter full address" />
        </Form.Item>
        <Form.Item
          label="Mobile Number"
          name="mobile"
          rules={[
            { required: true, message: "Please enter your mobile number" },
            {
              pattern: /^(\+92|0)[3-9][0-9]{9}$/,
              message: "Enter a valid  mobile number (e.g., 03001234567 or +923001234567)",
            },
          ]}
        >
          <Input type="tel" placeholder="Enter phone number" maxLength={13} />
        </Form.Item>

        <Form.Item label="Payment Method" name="paymentMethod">
          <Radio.Group>
            <Radio value="cash">Cash on Delivery</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CheckoutForm;
