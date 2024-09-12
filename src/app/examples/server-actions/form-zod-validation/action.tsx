'use server'

import { ZodError } from 'zod'
import DeviceSchema from './schema'

export async function createDeviceAction(
  prevState: any,
  formData: FormData,
): Promise<any> {
  try {
    const data = getDeviceDataFromFormData(formData)
    DeviceSchema.parse(data)
    const device = await createDevice(data)

    return {
      success: true,
      message: 'Device Created Successfully',
      payload: { device },
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: 'Validation Error',
        validationError: {
          issues: error.issues,
        },
      }
    }

    return {
      success: false,
      message: 'Failed to create device',
      error: JSON.stringify(error),
    }
  }
}

//simulates creating a device
export async function createDevice(data: any) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const device = {
    id: Math.round(Math.random() * 10000),
    ...data,
  }

  return device
}

//whitelist approach to pulling only data we want from the form
function getDeviceDataFromFormData(formData: FormData) {
  return {
    type: formData.get('type') as string,
    hostname: formData.get('hostname') as string,
    name: formData.get('name') as string,
  }
}
