'use server'

export async function createDeviceAction(prevState: any, formData: FormData) {
  const name = formData.get('name')

  if (name) {
    const device = {
      name,
      id: Math.round(Math.random() * 10000),
    }

    return {
      status: 'success',
      message: `Device '${name}' created with ID: ${device.id}`,
      device,
    }
  } else {
    return {
      status: 'error',
      message: 'Name is required',
    }
  }
}
