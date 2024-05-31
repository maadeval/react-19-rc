import { forwardRef } from 'react'

export function Form({ ref } = {}) {
  const handleFocusInput = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  return (
    <>
      <img
        src="https://react.dev/_next/image?url=%2Fimages%2Fuwu.png&w=640&q=75"
        alt="Logo de React"
      />
      <form className="form">
        <input ref={ref} name="nickname" placeholder="madeval" />
      </form>
      <button onClick={handleFocusInput}>Dar focus al input</button>
    </>
  )
}

export const OldForm = forwardRef((_, ref) => {
  const handleFocusInput = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  return (
    <>
      <img
        src="https://react.dev/_next/image?url=%2Fimages%2Fuwu.png&w=640&q=75"
        alt="Logo de React"
      />
      <form className="form">
        <input ref={ref} name="nickname" placeholder="madeval" />
      </form>
      <button onClick={handleFocusInput}>Dar focus al input</button>
    </>
  )
})

OldForm.displayName = 'OldForm'
