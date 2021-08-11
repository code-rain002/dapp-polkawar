import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "name", label: "Purchased By", minWidth: "33%" },
  { id: "code", label: "Price", minWidth: "33%" },
  {
    id: "population",
    label: "Date & Time",
    minWidth: "33%",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "transparent",
    color: "white",
    borderRadius: 10,
  },
  container: {
    maxHeight: 440,
    borderRadius: 7,
    border: "1px solid #757575",
  },
  tableBody: {
    width: "100%",
    padding: 40,
    textAlign: "center",
  },
});

export default function CustomeTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
        <div className={classes.tableBody}>Data not found</div>
      </TableContainer>
    </Paper>
  );
}
