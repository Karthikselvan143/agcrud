import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './App.css'; // Import the custom CSS file for gradient

const App = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([
    { id: 1, make: "Toyota", model: "Celica", price: 35000 },
    { id: 2, make: "Ford", model: "Mondeo", price: 32000 },
    { id: 3, make: "Porsche", model: "Boxster", price: 72000 },
    { id: 4, make: "BMW", model: "X5", price: 58000 },
    { id: 5, make: "Audi", model: "Q7", price: 65000 },
    { id: 6, make: "Mercedes", model: "GLE", price: 75000 },
  ]);

  const [columnDefs] = useState([
    { field: "make", headerName: "Make", editable: true },
    { field: "model", headerName: "Model", editable: true },
    { field: "price", headerName: "Price", editable: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRendererFramework: (params) => (
        <div className="action-buttons">
          <button className="edit-button" onClick={() => handleEdit(params.data)}>Edit</button>
          <button className="delete-button" onClick={() => handleDelete(params.data)}>Delete</button>
        </div>
      ),
    },
  ]);

  // Handle Edit Operation
  const handleEdit = (data) => {
    const newMake = prompt("Enter new make:", data.make);
    const newModel = prompt("Enter new model:", data.model);
    const newPrice = prompt("Enter new price:", data.price);

    if (newMake && newModel && newPrice) {
      const updatedData = rowData.map((row) =>
        row.id === data.id
          ? { ...row, make: newMake, model: newModel, price: newPrice }
          : row
      );
      setRowData(updatedData);
      alert(`Updated row with Make: ${newMake}, Model: ${newModel}, Price: ${newPrice}`);
    }
  };

  // Handle Delete Operation
  const handleDelete = (data) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${data.make}?`
    );
    if (confirmDelete) {
      const updatedData = rowData.filter((row) => row.id !== data.id);
      setRowData(updatedData);
      alert(`${data.make} has been deleted`);
    }
  };

  // Handle Adding a New Row
  const handleAddRow = () => {
    const newRow = {
      id: rowData.length + 1,
      make: prompt("Enter Make"),
      model: prompt("Enter Model"),
      price: prompt("Enter Price"),
    };
    setRowData([...rowData, newRow]);
  };

  return (
    <div className="app-container">
      <button className="add-row-button" onClick={handleAddRow}>Add Row</button>
      <div
        className="ag-theme-alpine grid-container"
        style={{ height: 500, width: "100%", marginTop: "20px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          animateRows={true} // Ensure rows are animated when updated
        />
      </div>
    </div>
  );
};

export default App;
