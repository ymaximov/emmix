import React from 'react'
import {AgGridReact} from 'ag-grid-react'
// import 'ag-grid-community/dist/styles/ag-grid.css'

export default function AgGrid() {
const rowData = [
    {make: 'ford', model: 'Taurus', price: '$40000'}
]

const columnDefs = [
    {field: 'make'},
    {field: 'model'}
]

  return (
    <AgGridReact rowData={rowData} columnDefs={columnDefs} />
  )
}
