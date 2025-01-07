import DataTable from "@/components/DataTable";
import { Combobox } from "@/components/ui/Combobox";
import ExcelDataContext from "@/contexts/ExcelDataContext";
import useDataInfo from "@/hooks/useDataInfo";
import { useContext, useMemo, useState } from "react";

export default function Analysis() {
  const { excelData } = useContext(ExcelDataContext);
  const [selectedCustomer, setSelectedCustomer] = useState<null | string>(null);

  const dataOverview = useDataInfo();
  const userInfo = useMemo(() => {
    if (!selectedCustomer || !excelData) return;
    return excelData.filter((data) => {
      return data.Nama_Cust === selectedCustomer;
    });
  }, [excelData, selectedCustomer]);

  return (
    <div className="h-full bg-gray-100 p-2 w-full">
      <div className="flex flex-col max-w-7xl mx-auto h-full bg-white shadow-md rounded-md px-4 py-6 w-full">
        <div className="">
          {dataOverview && (
            <Combobox
              defaultValue={selectedCustomer}
              onChange={setSelectedCustomer}
              data={Array.from(dataOverview.customers).map((customer) => ({
                label: customer.name,
                value: customer.postalCode,
              }))}
            />
          )}
          <DataTable data={userInfo || []} />
        </div>
      </div>
    </div>
  );
}
