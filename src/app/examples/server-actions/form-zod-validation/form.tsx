'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createDeviceAction } from './action'

type Device = {
  id: number
  name: string
  hostname: string
  type: string
  [key: string]: any
}

export default function ValidatedForm({ device }: { device?: Device }) {
  const [state, formAction] = useFormState(createDeviceAction, {
    success: '',
    message: '',
    validationError: {},
  })

  const errors = state.validationError?.issues || []

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <Field>
        <Label>Device Name</Label>
        <Input
          invalid={fieldHasError(errors, 'name')}
          name="name"
          placeholder="At least 2 characters"
          defaultValue={device?.name || undefined}
        />
        <ErrorMessage>{errorForField(errors, 'name')?.message}</ErrorMessage>
      </Field>
      <Field>
        <Label>Hostname</Label>
        <Description>
          Host name or IP address of the server to back up
        </Description>
        <Input
          invalid={fieldHasError(errors, 'hostname')}
          name="hostname"
          placeholder="http://192.168.1.1"
          defaultValue={device?.hostname || undefined}
        />
        <ErrorMessage>
          {errorForField(errors, 'hostname')?.message}
        </ErrorMessage>
      </Field>
      <Field>
        <Label>Type</Label>
        <Description>The type of device to back up</Description>
        <Input
          invalid={fieldHasError(errors, 'type')}
          name="type"
          defaultValue={device?.type || undefined}
          placeholder="hass, tplink or opnsense"
        />
        <ErrorMessage>{errorForField(errors, 'type')?.message}</ErrorMessage>
      </Field>
      {state.success === true && (
        <p className="m-0 text-green-500">{state.message}</p>
      )}
      <div className="flex justify-end">
        {device && <input type="hidden" name="id" value={device.id} />}
        <SubmitButton />
      </div>
    </form>
  )
}

const fieldHasError = (errors: any[], field: string): boolean => {
  return !!errorForField(errors, field)
}

const errorForField = (errors: any[], field: string) => {
  return errors.find((e) => e.path[0] === field)
}

function Input({ invalid, ...props }: any) {
  return (
    <input
      className={`rounded-lg border px-3 py-1 ${invalid ? 'border-red-500' : 'border-gray-300'}`}
      {...props}
    />
  )
}

function Field({ children }: any) {
  return <div className="flex flex-col gap-1">{children}</div>
}

function Label({ children }: any) {
  return <label className="text-sm font-semibold">{children}</label>
}

function Description({ children }: any) {
  return <p className="m-0 text-sm text-gray-500">{children}</p>
}

function ErrorMessage({ children }: any) {
  return <p className="m-0 text-sm text-red-500">{children}</p>
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700"
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
