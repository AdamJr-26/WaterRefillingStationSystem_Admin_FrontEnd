import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

function AdminDataGrid({ TableRows, TableColumns, pageOptions, allowCheckBox }) {

  const [pageSize, setPageSize] = useState(5);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeader":{
            color: "black",
            fontWeight: 'bold',
            backgroundColor: '#EEEEEE', //F8F9FA
            fontSize: 17,
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
