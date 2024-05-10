import { Modal, Radio, Slider } from "antd"
import { Form } from "antd"
import { useState } from "react"
import { RadioChangeEvent } from "antd/lib/radio"
const DataFiller = (props: any) => {
    const [Weekvalue, setWeekValue] = useState(1);
    const onChangeWeek = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setWeekValue(e.target.value);
    };
    const [Monthvalue, setMonthValue] = useState(1);
    const onChangeMonth = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setMonthValue(e.target.value);
    };
    const [value, setValue] = useState(0);
    const onChangeValue = (value: number) => {
        setValue(value);
        console.log(value);
    }
    return (
        <>
            <Modal
                title="Fill the data"
                open={props.currentPart !== ''}
                onOk={() => {
                    props.PainLevel[props.currentPart] = value
                    props.setCurrentPart('')
                }}
                onCancel={() => { props.setCurrentPart('') }}
                mask={false}
            >

                <Form>
                    <Slider onChange={onChangeValue} value={value} max={10} min={0} />
                    <Form.Item label="Pain Week">
                        <Radio.Group onChange={onChangeWeek} value={Weekvalue}>
                            <Radio value={0}>Yes</Radio>
                            <Radio value={1}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Pain Month">
                        <Radio.Group onChange={onChangeMonth} value={Monthvalue}>
                            <Radio value={0}>Yes</Radio>
                            <Radio value={1}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default DataFiller;