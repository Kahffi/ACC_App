import ExcelDataContext from "@/contexts/ExcelDataContext";
import { useContext, useMemo } from "react";

export default function useDataInfo() {
  const { excelData } = useContext(ExcelDataContext);

  const dataOverview = useMemo(() => {
    if (!excelData) return null;

    let totalOverdue = 0;

    let totalCustomer = 0;
    const customers = new Set<{ name: string; postalCode: string }>([]);

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

      customers.add({ name: data.Nama_Cust, postalCode: data.KODE_POS });

      //  Menghitung jumlah total arro
      arros.add(data.ARRO);
      //  Menghitung jumlah total arho
      arhos.add(data.ARHO);
    });

    totalCustomer = customers.size;
    totalArro += arros.size;
    totalArho += arhos.size;

    return {
      totalOverdue,
      totalCustomer,
      totalData: excelData.length + 1,
      totalArro,
      totalArho,
      customers,
    };
  }, [excelData]);
  console.log("hayo");

  return dataOverview;
}
