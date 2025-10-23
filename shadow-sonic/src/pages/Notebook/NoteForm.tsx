import { Button, App, Upload, Tabs, Select, List, Form, Row, Col, Tag, Divider, Input, message, Modal } from "antd";

const tagList = [
    "drum", "melody", "chord", "soprano", "alto", "bass", 
]

function NoteForm(props) {
    const { form, onFinish, name } = props
    const tagOptions = tagList.map(item => { return {label: item, value: item} })
    return (
        <Form name={name} form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 500 }}
            onFinish={onFinish}>
            <Form.Item label="Notebook Name" name="name" rules={[{ required: true, message: 'Please input notebook name' }]}>
                <Input placeholder="notebook name"/>
            </Form.Item>

            <Form.Item label="tags" name="tags" rules={[]}>
                <Select mode="multiple" placeholder="select tags" options={tagOptions}/>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
}

export { NoteForm }