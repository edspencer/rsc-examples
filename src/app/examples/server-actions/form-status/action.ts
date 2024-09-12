'use server'

export async function createDeviceActionSlow(
  prevState: any,
  formData: FormData,
) {
  const name = formData.get('name')

  // Simulate a slow network request
  await new Promise((resolve) => setTimeout(resolve, 3000))

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
