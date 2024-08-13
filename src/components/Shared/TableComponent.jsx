import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableHeaderComponent = ({ headers }) => (
  <TableHeader>
    <TableRow>
      {headers.map((header, index) => (
        <TableHead key={index} className={header.className}>
          {header.label}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>
);

const TableBodyComponent = ({ rows }) => (
  <TableBody>
    {rows?.map((row, rowIndex) => (
      <TableRow key={rowIndex}>
        {row?.map((cell, cellIndex) => (
          <TableCell
            key={cellIndex}
            className={cell.className}
            onClick={
              cell.onClick ? () => cell.onClick(rowIndex, cellIndex) : undefined
            }
          >
            {cell.value}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

const TableComponent = ({ caption, headers, rows, footer }) => {
  return (
    <div>
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeaderComponent headers={headers} />
        <TableBodyComponent rows={rows} />
        {footer && (
          <TableFooter>
            <TableRow>
              {footer.map((cell, index) => (
                <TableCell
                  key={index}
                  colSpan={cell.colSpan}
                  className={cell.className}
                >
                  {cell.value}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};

export default TableComponent;
