import React, { useContext, useMemo } from "react";
import ExcelDataContext from "@/contexts/ExcelDataContext";

const Dashboard: React.FC = () => {
  // check if the current user is admin:
  const { excelData, timeUploaded } = useContext(ExcelDataContext);

  const dataOverview = useMemo(() => {
    if (!excelData) return null;

    let totalOverdue = 0;

    let totalCustomer = 0;
    const customers = new Set<string>([]);

    let totalArro = 0;
    const arros = new Set<string>([]);

    let totalArho = 0;
    const arhos = new Set<string>([]);

    function parseStringOrNumber(data: string | number) {
      if (typeof data === "string") {
        return parseInt(data);
      } else if (typeof data === "number") {
        return data;
      } else {
        return 0;
      }
    }

    excelData.forEach((data) => {
      // menghitung jumlah total overdue
      totalOverdue =
        parseStringOrNumber(data.Over) > 0 ? totalOverdue + 1 : totalOverdue;
      // menghitung jumlah customer unik
      customers.add(data.Nama_Cust);
      //  Menghitung jumlah total arro
      arros.add(data.ARRO);
      //  Menghitung jumlah total arho
      arhos.add(data.ARHO);
    });

    totalCustomer = customers.size;
    totalArro = arros.size;
    totalArho = arhos.size;

    return {
      totalOverdue,
      totalCustomer,
      totalData: excelData.length + 1,
      totalArro,
      totalArho,
    };
  }, [excelData]);

  return (
    <div className="h-full bg-gray-100 p-2 w-full">
      <div className="flex flex-wrap gap-5">
        {/* last update */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-7 pt-5 w-52 gap-3">
          <h3 className="font-semibold text-gray-500">
            Terakhir diperbarui pada
          </h3>
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
    </div>
  );
};

export default Dashboard;
