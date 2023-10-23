import * as React from 'react';
import { Column, ColumnHeaderCell2, EditableCell2, Region, Table2 } from '@blueprintjs/table';
import './OpviaTable.css';
import { dummyTableData2 } from './data/dummyData2';
import { IoRemoveCircleOutline } from 'react-icons/io5';
import HyperFormula from 'hyperformula';
import Aggregations from './components/Aggregations';


const columns = [
  { columnName: 'Time', columnType: 'time', columnId: 'time_col', columnFormula: '' },
  { columnName: 'Cell Density', columnType: 'data', columnId: 'var_col_1', columnFormula: '' },
  { columnName: 'Volume', columnType: 'data', columnId: 'var_col_2', columnFormula: '' },
];

const OpviaTable: React.FC = () => {
  const [selected, setSelected] = React.useState({columnStart : '', rowStart: '', columnEnd: '', rowEnd: ''});
  const [columnsState, setColumnsState] = React.useState(columns);
  const [newColumnState, setNewColumnState] = React.useState({ columnName: '', columnType: '', columnId: '', formula: '' });
  
  const [aggregationVars, setAggregationVars] = React.useState<Array<{name: string, value: string |number , formula: string | number}>>([]);
  const [newAggregationVar, setNewAggregationVar] = React.useState({ name: '', value: '', formula: '' });
  let i: number, j: number;


  let data = dummyTableData2;
  const hf: HyperFormula = HyperFormula.buildEmpty({ licenseKey: "gpl-v3" });
  // Add a new sheet and get its id.
  const sheetName: string = hf.addSheet("main");
  const sheetId: any = hf.getSheetId(sheetName);
  // Fill the HyperFormula sheet with data.
  hf.setCellContents({ row: 0, col: 0, sheet: sheetId }, data);


  const handleAggregationNameInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAggregationVar({ ...newAggregationVar, name: e.target.value });

  }
  const handleAggregationFormulaInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setNewAggregationVar({ ...newAggregationVar, formula: e.target.value });
  }

  const handleColumnNameInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnState({ ...newColumnState, columnName: e.target.value });
  }
  const handleFormulaOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setNewColumnState({ ...newColumnState, formula: e.target.value });
  }
  const handleCellUpdate = (val: any, rowIndex: number, columnIndex: number) => {
    data[rowIndex][columnIndex] = val;
  }

  const cellRenderer = (rowIndex: number, columnIndex: number): JSX.Element => {
    i = rowIndex + 1;
    j = columnIndex;
    const b = eval('`=' + columnsState[j].columnFormula + '`');
    const cellAddress = { sheet: sheetId, col: columnIndex, row: rowIndex };
    let cellValue;
    if (hf.getCellValue(cellAddress) && data[rowIndex][j]) {
      cellValue = hf.getCellValue(cellAddress);
    }
    if (!cellValue) {
      try {
        cellValue = hf.calculateFormula(b, 0);
        data[rowIndex][j] = String(cellValue);
      }
      catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          // alert(err.message)
        }
        cellValue = undefined;
      }

    }
    return <EditableCell2 rowIndex={rowIndex} columnIndex={j} value={String(cellValue)} onConfirm={(val, rowIndex, columnIndex) => handleCellUpdate(val!, rowIndex!, columnIndex!)} />

  }

  const headerCellRenderer = (colName: string): JSX.Element => {
    return (<ColumnHeaderCell2>
      <div className='tooltip'>
        {colName}
        <div>
          <IoRemoveCircleOutline className='IoRemoveCircleOutline' name={colName} onClick={() => handleRemoveColumn(colName)} />
          <span className='tooltiptext'>Remove</span>
        </div>
      </div>
    </ColumnHeaderCell2>);
  }

  const cols: JSX.Element[] = columnsState.map((column) => (
    <Column key={`${column.columnId}`} cellRenderer={cellRenderer} name={column.columnName} columnHeaderCellRenderer={() => headerCellRenderer(column.columnName)} />
  ));

  const handleNewColumnOnSubmit = (event: any) => {
    event?.preventDefault();
  }

  const selectionRegion = (selectRegion: Array<any> ) => {
    const colStart = String.fromCharCode(selectRegion[0].cols[0] + 65);
    const colEnd = String.fromCharCode(selectRegion[0].cols[1] + 65);
    const rowStart = selectRegion[0].rows[0] + 1;
    const rowEnd = selectRegion[0].rows[1] + 1;
    setSelected({ columnStart: colStart, rowStart, columnEnd: colEnd, rowEnd});
  }

  const handleAddColumn = () => {
    const formulaInput = newColumnState.formula;
    const currentColumnNames = columnsState.map(column => {
      return column.columnName;
    })
    if (currentColumnNames.includes(newColumnState.columnName)) {
      alert("Identical input name to an existing column name!")
    }
    if (formulaInput && !currentColumnNames.includes(newColumnState.columnName)) {
      let newColumn = { columnName: newColumnState.columnName, columnType: 'data', columnId: newColumnState.columnName, columnFormula: formulaInput };
      const newColumnsState = [...columnsState, newColumn];
      setColumnsState(newColumnsState);
    }
  }



  const handleRemoveColumn = (columnName: string) => {
    const colPosition = columnsState.findIndex(n => n.columnName === columnName);
    for (let i = 0; i < data.length; i++) {
      data[i].splice(colPosition, 1);
    }
    const updatedColumns = columnsState.filter((column) => {
      return column.columnName !== columnName
    });
    setColumnsState(updatedColumns);
  }

  const handleNewAggregationVarOnSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    setNewAggregationVar({ ...newAggregationVar, name: '', value: '', formula: '' });
  }

  const handleAddAggregationVar = () => {
    const currentAggregationNames = aggregationVars.map((variable) => {
      return variable.name;
    })
    if (currentAggregationNames.includes(newAggregationVar.name)) {
      alert("Variable name already exists!");
    }
    else {
      const value = hf.calculateFormula("=" + newAggregationVar.formula, 0);
      const newAggregationVarsState : Array<any> = [...aggregationVars, { name: newAggregationVar.name, value: value, formula: newAggregationVar.formula }];
      setAggregationVars(newAggregationVarsState);
    }
  }



  return (
    <div >
      <div className="table-title flex-container" style={{ display: "flex", justifyContent: "center" }}>
        <h1>Opvia
          <span>Table Component</span>
        </h1>
      </div>

      <div className="blueprint-table2" style={{ display: "flex", justifyContent: "center" }}>
        <Table2 defaultRowHeight={30} numRows={8} onSelection={(e : any) => { selectionRegion(e);  } } >
          {cols}
        </Table2>    
      </div>
      <div className='tiptext'>Selected Region: <strong>{selected.columnStart}{selected.rowStart}: {selected.columnEnd}{selected.rowEnd}</strong>  </div>

      <div className='flex-container tooltipbottom' style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <form onSubmit={handleNewColumnOnSubmit}>
          <input onChange={handleColumnNameInputOnChange} value={newColumnState.columnName} placeholder='New Column name'></input>
          <input id="formulaInput" onChange={handleFormulaOnChange} value={newColumnState.formula} placeholder='Enter Formula here.' ></input>
        </form>
        <button className='button' type="submit" onClick={() => handleAddColumn()} >Add Calculation column </button>
      </div>
      <div className="tiptext"><strong>Tip</strong>: cells start from A1 and you may use the character i as a dummy variable for column operations. 
        <br /> Example: entering B$&#123;i&#125;*C$&#123;i&#125;  would multiply the second and third column's cells.
        <br /> <a href="https://hyperformula.handsontable.com/guide/built-in-functions.html#list-of-available-functions">See here</a> for a full list of available operations
      </div>

      <hr />

      <div className='flex-container' style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <form onSubmit={handleNewAggregationVarOnSubmit}>
          <input value={newAggregationVar.name} onChange={handleAggregationNameInputOnChange} placeholder='Variable name'></input>
          <input value={newAggregationVar.formula} onChange={handleAggregationFormulaInputOnChange} placeholder='Enter formula' ></input>
        </form>
        <button className='button' type="submit" onClick={() => handleAddAggregationVar()} >Add Aggregation variable </button>
      </div>

      <div className='flex-container' style={{ display: "flex", justifyContent: "center" }}>
        <Aggregations aggregationVars={aggregationVars} setAggregationVars={(e: any) => setAggregationVars(e)} > </Aggregations>
      </div>

    </div>
  );
};

export default OpviaTable;
