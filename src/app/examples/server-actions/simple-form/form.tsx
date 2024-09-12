'use client'
import { useFormState } from 'react-dom'
import { createDeviceAction } from './action'

export function AddDeviceForm() {
  const [state, formAction] = useFormState(createDeviceAction, {
    status: '',
    message: '',
  })

  return (
    <form action={formAction} className="server-actions-simple-form">
      <fieldset>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" placeholder="type something" />
        <button type="submit">Submit</button>
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
