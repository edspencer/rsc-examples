'use client'
import { use } from 'react'

export default function Table({ dataPromise }: { dataPromise: Promise<any> }) {
  const data = use(dataPromise)

  return (
    <table className="max-w-5xl table-auto text-left">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row: any) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
