import {useState} from 'react'
import {useOnMountv2} from '../../../hooks'
import {Button, Form, FormInstance} from 'antd'
const SubmitButton = ({form}: {form: FormInstance}) => {
  const [submittable, setSubmittable] = useState(false)
  const values = Form.useWatch([], form)
  useOnMountv2(() => {
    form.validateFields({validateOnly: true}).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      },
    )
  }, [values])
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  )
}
export default SubmitButton
