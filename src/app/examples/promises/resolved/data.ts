const fakeData = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]

export async function getData(delay: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeData)
    }, delay)
  })
}
