import { z } from 'zod'

export const DeviceTypes = {
  opnsense: 'OPNSense',
  hass: 'Home Assistant',
  tplink: 'TP-Link',
}

const DeviceSchema = z.object({
  name: z.string().min(2).optional().nullable(),
  type: z.enum([Object.keys(DeviceTypes)[0], ...Object.keys(DeviceTypes)]),
  hostname: z.string().min(2).optional().nullable(),
})

export default DeviceSchema
