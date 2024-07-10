// Simulates fetching product data from a database/API
export async function loadProductData(
  delay = 20,
): Promise<{ name: string; price: number; description: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Product Name',
        price: 100,
        description: 'This is a product description',
      })
    }, delay)
  })
}
