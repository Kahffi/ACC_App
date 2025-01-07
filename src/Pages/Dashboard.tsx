import React, { useContext, useMemo, useState } from "react";
import ExcelDataContext from "@/contexts/ExcelDataContext";
import useDataInfo from "@/hooks/useDataInfo";
import DataTable from "@/components/DataTable";
import { Combobox } from "@/components/ui/Combobox";

const Dashboard: React.FC = () => {
  // check if the current user is admin:
  const { timeUploaded } = useContext(ExcelDataContext);

  const dataOverview = useDataInfo();

  const { excelData } = useContext(ExcelDataContext);
  const [selectedCustomer, setSelectedCustomer] = useState<null | string>(null);

  const userInfo = useMemo(() => {
    if (!selectedCustomer || !excelData) return;
    return excelData.filter((data) => {
      return data.Nama_Cust === selectedCustomer;
    });
  }, [excelData, selectedCustomer]);

  return (
    <div className="h-full bg-gray-100 p-4 w-full overflow-auto flex flex-col gap-10">
      <div className="flex flex-wrap gap-5">
        {/* last update */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-7 pt-5 w-52 gap-3">
          <h3 className="font-semibold text-gray-500">Terakhir Diperbarui</h3>
          <h2 className="text-2xl font-semibold text-orange-600">
            {timeUploaded && new Date(timeUploaded).toLocaleString()}
          </h2>
        </div>

        {/* total overdue */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-7 pt-5 w-52 gap-3 ">
          <h3 className="font-semibold text-gray-500">Jumlah Overdue</h3>
          <h2 className="text-5xl font-semibold text-orange-600">
            {dataOverview && dataOverview.totalOverdue}
          </h2>
        </div>

        {/* total unique customer */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-7 pt-5 w-52 gap-3">
          <h3 className="font-semibold text-gray-500">Jumlah Customer</h3>
          <h2 className="text-5xl font-semibold text-blue-600">
            {dataOverview && dataOverview.totalCustomer}
          </h2>
        </div>

        {/* Jumlah baris data */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-7 pt-5 w-52 gap-3">
          <h3 className="font-semibold text-gray-500">Jumlah Baris Data</h3>
          <h2 className="text-5xl font-semibold text-blue-800">
            {dataOverview && dataOverview.totalData}
          </h2>
        </div>

        {/* Jumlah Arho */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-7 pt-5 w-52 gap-3">
          <h3 className="font-semibold text-gray-500">Jumlah ARHO</h3>
          <h2 className="text-5xl font-semibold text-green-500">
            {dataOverview && dataOverview.totalArho}
          </h2>
        </div>

        {/* Jumlah Arro */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-7 pt-5 w-52 gap-3">
          <h3 className="font-semibold text-gray-500">Jumlah ARRO</h3>
          <h2 className="text-5xl font-semibold text-green-700">
            {dataOverview && dataOverview.totalArro}
          </h2>
        </div>
      </div>

      <div className="h-fit bg-gray-100 w-full">
        <div className="flex flex-col max-w-7xl mx-auto h-full bg-white shadow-md rounded-md px-4 py-6 w-full">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-700">Select Customer</p>
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
            </div>
            <DataTable data={userInfo || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
