import styled from 'styled-components'

interface IButtonProps {
  onClick: () => void
  disabled: boolean
  btnName: string
}

function Button(props: IButtonProps) {
  const { btnName, disabled, onClick } = props
  return (
    <StyledBtn disabled={disabled} onClick={onClick}>
      {btnName}
    </StyledBtn>
  )
}

export default Button

const StyledBtn = styled.button`
  max-width: 600px;
  padding: 20px;
  background: skyblue;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background: grey;
    cursor: not-allowed;
    &:active {
      opacity: 1;
    }
  }

  &:active {
    opacity: 0.7;
  }
`
