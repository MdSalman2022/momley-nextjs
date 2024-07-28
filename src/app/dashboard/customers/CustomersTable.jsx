import React, { useEffect, useState } from "react";
import { DataTable } from "@/app/profile/orders/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import avatar from "@/../public/images/profile/avatar.jpg";
import useCustomer from "@/hooks/useCustomer";

const CustomersTable = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const { GetCustomers } = useCustomer();

  useEffect(() => {
    const fetchData = async () => {
      const allCustomer = await GetCustomers();
      console.log("allCustomer", allCustomer);

      if (allCustomer.success) {
        setAllCustomers(allCustomer?.data);
      }
      console.log("allCustomer", allCustomer);
    };

    fetchData();
  }, []);

  console.log("all customers", allCustomers);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const { sortType, setSortType } = useState("Newest");
  const handleSorting = (value) => {
    console.log("value", value);
    setSortType(value);
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      accessorKey: "id", // Assuming each row has a unique 'id' field
    },
    {
      id: "CustomersName",
      header: "Customers Name",
      accessorKey: "CustomersName",
    },
    {
      id: "Orders",
      header: "Orders",
      accessorKey: "Orders",
    },
    {
      id: "BDTSpent",
      header: "BDT Spent",
      accessorKey: "BDTSpent",
    },
  ];

  const data = [
    {
      id: "1",
      CustomersName: (
        <span className="flex items.center gap-1">
          <Image src={avatar} className="w-10 h-10 rounded-lg" />
          <div className="flex flex-col">
            <span>Customers 1</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </span>
      ),
      Orders: "5",
      BDTSpent: "500",
    },
    {
      id: "2",
      CustomersName: (
        <span className="flex items.center gap-1">
          <Image src={avatar} className="w-10 h-10 rounded-lg" />
          <div className="flex flex-col">
            <span>Customers 1</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </span>
      ),
      Orders: "10",
      BDTSpent: "1000",
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p>02 Customers</p>
        <Select onValueChange={handleSorting}>
          <SelectTrigger className="w-40 h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
            <SelectValue placeholder={sortType || "Most"} />
          </SelectTrigger>
          <SelectContent>
            {[
              { value: "most", label: "Most" },
              { value: "least", label: "Least" },
            ].map((action, index) => (
              <SelectItem key={index} value={action.value}>
                {action.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataTable
        columns={columns}
        data={data}
        setSorting={setSorting}
        setColumnFilters={setColumnFilters}
        setColumnVisibility={setColumnVisibility}
        setRowSelection={setRowSelection}
        sorting={sorting}
        columnFilters={columnFilters}
        columnVisibility={columnVisibility}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default CustomersTable;
