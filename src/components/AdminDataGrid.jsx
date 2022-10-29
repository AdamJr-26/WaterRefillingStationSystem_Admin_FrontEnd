import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

function AdminDataGrid({ TableRows, TableColumns, pageOptions, allowCheckBox }) {

  const [pageSize, setPageSize] = useState(5);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          backgroundColor: "white",
          "& .MuiDataGrid-columnHeader":{
            color: "black",
            fontWeight: 'bold',
            backgroundColor: 'white', //F8F9FA
            fontSize: 17,
          },
          "& .MuiDtaGrid-cell":{
            backgroundColor: "white"
          },
          "& .MuiDataGrid-columnSeparator":{
            color: "#C0C0C0	",
          }
      
        }}
        rows={TableRows}
        columns={TableColumns}
        pageSize={pageSize}
        checkboxSelection
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Box>
  );
}

export default AdminDataGrid;
