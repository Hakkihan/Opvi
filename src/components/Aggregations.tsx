import * as React from 'react';
import { IoRemoveCircleOutline } from 'react-icons/io5';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function Aggregations({ aggregationVars, setAggregationVars} : any) {
    const gridRef = React.useRef<AgGridReact>(null);
    const getRowId = (params: any) => { return params.data.name };

    const rowData = aggregationVars.map((variable : {name:string, value: string|number, formula: string|number }) => {
        return ({ name: variable.name, value: variable.value, formula: variable.formula });
    });

    const cellRenderer = (props: any) => {
        return (<div className='tooltip' id={props.node.rowIndex} onClick={() => { const e = handleRemoveVariable(props.node.rowIndex); setAggregationVars(e); }}>
                    <IoRemoveCircleOutline className='IoRemoveCircleOutline' />
                    <span className='tooltiptext'>Remove</span>
            </div>);
    }

    const columnDefs = [
        { field: "name", width:200 },
        { field: "value", width:250 },
        { field: "", cellRenderer: cellRenderer }
    ]

    const handleRemoveVariable = (rowIndex: number) => {
        const updatedVariables = rowData;
        updatedVariables.splice(rowIndex, 1);
        return updatedVariables;
    };

    return (
        <div >
            <div className="ag-theme-alpine" style={{ height: 250, width: 650 }}>
                <AgGridReact ref={gridRef} rowData={rowData} getRowId={getRowId} columnDefs={columnDefs}></AgGridReact>
            </div>
        </div>
    );
};

export default Aggregations;