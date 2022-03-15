import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { useTranslation } from "react-i18next";

function LoginForm(props) {
    const { t } = useTranslation();

    const onFinish = (values) => {
        console.log(values);
        console.log("Finished");
    };

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
        console.log("Finish-Failed");
    };

    const onValuesChange = () => {
        console.log("Value has been changed.");
    };

    const formConfig = {
        name: "login-form",
        layout: "vertical",
        labelCol: {
            span: 0
        },
        wrapperCol: {
            span: 24
        },
        initialValues: { remember: true },
        onFinish: onFinish,
        onFinishFailed: onFinishFailed,
        onValuesChange: onValuesChange
    };

    return (
        <Form {...props} {...formConfig}>
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!"
                    }
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!"
                    }
                ]}>
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {t("form.submit")}
                </Button>
                <Button type="danger" htmlType="reset">
                    {t("form.reset")}
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;
