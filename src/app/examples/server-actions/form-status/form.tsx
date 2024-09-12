'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { createDeviceActionSlow } from './action'

export function SlowForm() {
  const [state, formAction] = useFormState(createDeviceActionSlow, {
    status: '',
    message: '',
  })

  return (
    <form action={formAction} className="server-actions-simple-form">
      <fieldset>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" placeholder="type something" />
        <SubmitButton />
      </fieldset>
      {state.status === 'error' && (
        <p className="text-red-500">{state.message}</p>
      )}
      {state.status === 'success' && (
        <p className="text-green-500">{state.message}</p>
      )}
    </form>
  )
}

//this has to be a separate component because we can't use the useFormStatus hook in the
//same component that has the <form>
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
