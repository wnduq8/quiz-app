import { ChangeEvent } from 'react'

interface IRadioProps {
  value: string
  label: string
  id: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function Radio(props: IRadioProps) {
  const { value, label, id, checked, onChange } = props
  return (
    <>
      <input type="radio" id={id} value={value} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </>
  )
}

export default Radio
