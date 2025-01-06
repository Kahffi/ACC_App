import { createContext } from "react";

export interface ProcessedData {
  Proses: string;
  KODE_POS: string;
  Agreement: string;
  Nama_Cust: string;
  Alamat: string;
  Model: string;
  Nopol: string;
  Warna: string;
  Thn_Mobil: string | number;
  UN: string;
  Ang_ke: number;
  Jml_Ang: number;
  Nil_Ang: string | number;
  Tgl_Due: string;
  Tgl_Bayar: string;
  Over: string | number;
  Saldo: string | number;
  ARHO: string;
  ARRO: string;
}
const ExcelDataContext = createContext<ProcessedData[] | null>(null);
export default ExcelDataContext;
