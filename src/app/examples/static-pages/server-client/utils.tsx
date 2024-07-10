export async function getMicrophones() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.filter((device) => device.kind === 'audioinput')
  } catch (error) {
    console.error('Error enumerating devices:', error)
    return []
  }
}
