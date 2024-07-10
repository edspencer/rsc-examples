import MyComponent from './component'
import { loadProductData } from './data'

export default async function Page() {
  const data = await loadProductData()

  return (
    <div>
      <h1>My Cool RSC-powered store</h1>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <MyComponent />
    </div>
  )
}
