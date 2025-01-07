import DataTable from "@/components/DataTable";
import { AuthContext } from "@/contexts/AuthContext";
import ExcelDataContext, { ProcessedData } from "@/contexts/ExcelDataContext";
import { database } from "@/firebase";
import { ref, set } from "firebase/database";
import { useContext, useState } from "react";
import readXlsxFile from "read-excel-file";

export default function Report() {
  // check if the current user is admin:
  const { currentUser } = useContext(AuthContext);

  const { excelData, timeUploaded } = useContext(ExcelDataContext);

  const [error, setError] = useState<string | null>(null);
  // Fungsi untuk menangani unggahan file
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    readXlsxFile(file, { sheet: "UPLOAD-ASCII 011224-TM" })
      .then((rows) => {
        console.log("Data yang dibaca dari file Excel:", rows);

        // Proses data menjadi array objek
        const processedData: ProcessedData[] = rows
          .slice(1)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((row: any) => {
            // Validasi jumlah kolom
            if (row.length < 18) {
              console.warn("Data tidak lengkap pada baris:", row);
              return null; // Abaikan baris jika tidak lengkap
            }

            // Mapping data ke interface
            return {
              Proses:
                row[0] instanceof Date ? row[0].toLocaleDateString() : row[0],
              KODE_POS: row[1],
              Agreement: row[2],
              Nama_Cust: row[3],
              Alamat: row[4],
              Model: row[5],
              Nopol: row[6],
              Warna: row[7],
              Thn_Mobil: row[8],
              UN: row[9],
              Ang_ke: row[10],
              Jml_Ang: row[11],
              Nil_Ang: row[12],
              Tgl_Due:
                row[13] instanceof Date
                  ? row[13].toLocaleDateString()
                  : row[13],
              Tgl_Bayar:
                row[14] instanceof Date
                  ? row[14].toLocaleDateString()
                  : row[14],
              Over: row[15],
              Saldo: row[16],
              ARHO: row[17],
              ARRO: row[18],
            };
          })
          .filter((row) => row !== null); // Hapus baris null jika ada

        console.log("Data yang sudah diproses:", processedData);

        // Simpan data ke Firebase Realtime Database
        const dbRef = ref(database, "uploads");
        set(dbRef, { data: processedData, time: Date.now() })
          .then(() => {
            alert("Data berhasil diunggah ke Firebase!");
          })
          .catch((err) => {
            console.error("Error menulis data ke Firebase:", err);
            setError("Terjadi kesalahan saat mengunggah data ke Firebase.");
          });
      })
      .catch((err) => {
        console.error("Error membaca file Excel:", err);
        setError("Terjadi kesalahan saat membaca file Excel.");
      });
  };

  console.log("halo");

  return (
    <div className="h-full bg-gray-100 p-2 w-full">
      <div className="flex flex-col max-w-7xl mx-auto h-full bg-white shadow-md rounded-md px-4 py-6 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Dashboard - Data Upload ASCII
        </h1>

        {!currentUser ? (
          <></>
        ) : currentUser?.isAdmin ? (
          <>
            {/* Menampilkan error jika ada */}
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className="mb-2 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
            <p className="mb-2">
              Last update:{" "}
              <span>{new Date(timeUploaded!).toLocaleString()}</span>
            </p>
            <DataTable data={excelData || []} />
          </>
        ) : (
          // {/* tampilan user biasa */}
          <DataTable data={excelData || []} />
        )}
      </div>
    </div>
  );
}
// 3274
