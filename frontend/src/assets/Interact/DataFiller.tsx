import { Modal, Radio, Slider } from "antd"
import { Form } from "antd"
import { useState } from "react"
import { RadioChangeEvent } from "antd/lib/radio"
const DataFiller = (props: any) => {
    const [Weekvalue, setWeekValue] = useState(0);
    const onChangeWeek = (e: RadioChangeEvent) => {
        setWeekValue(e.target.value);
    };
    const [Monthvalue, setMonthValue] = useState(0);
    const onChangeMonth = (e: RadioChangeEvent) => {
        setMonthValue(e.target.value);
    };
    const [value, setValue] = useState(0);
    const onChangeValue = (value: number) => {
        setValue(value);
    }
    
    return (
        <>
            <Modal
                title={"Fill the data of " + props.currentPart}
                open={props.currentPart !== ''}
                onOk={() => {
                    props.MonthPain[props.currentPart] = Monthvalue
                    props.WeekPain[props.currentPart] = Weekvalue
                    props.PainLevel[props.currentPart] = value
                    props.setCurrentPart('')
                    console.log(props.MonthPain)
                }}
                onCancel={() => { props.setCurrentPart('') }}
                mask={false}
            >

                <Form>
                    <Slider onChange={onChangeValue} value={value} max={10} min={0} />
                    
                    <Form.Item label="Pain Week">
                        <Radio.Group onChange={onChangeWeek} value={Weekvalue}>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Pain Month">
                        <Radio.Group onChange={onChangeMonth} value={Monthvalue}>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default DataFiller;