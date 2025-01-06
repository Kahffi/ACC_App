import ExcelDataContext, { ProcessedData } from "@/contexts/ExcelDataContext";
import { database } from "@/firebase";
import { ref, set } from "firebase/database";
import { useContext, useState } from "react";
import readXlsxFile from "read-excel-file";

export default function AdminReports() {
  const { excelData: data } = useContext(ExcelDataContext);

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
        set(dbRef, processedData)
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

  return (
    <>
      {/* tampilan admin */}
      <div className="flex flex-col max-w-7xl mx-auto h-full bg-white shadow-md rounded-md px-4 py-6 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Dashboard - Data Upload ASCII
        </h1>

        {/* Menampilkan error jika ada */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Input File */}
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className="mb-4 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
        />
        <div className="w-full flex-1 overflow-auto">
          {/* Tabel Data dengan Scroll */}
          {data && data.length > 0 && (
            <div className="h-fit">
              <table className="h-fit table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Proses
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Kode Pos
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Agreement
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nama Customer
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Alamat</th>
                    <th className="border border-gray-300 px-4 py-2">Model</th>
                    <th className="border border-gray-300 px-4 py-2">Nopol</th>
                    <th className="border border-gray-300 px-4 py-2">Warna</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tahun Mobil
                    </th>
                    <th className="border border-gray-300 px-4 py-2">U/N</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Angsuran Ke
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Jumlah Angsuran
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Nilai Angsuran
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Jatuh Tempo
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tanggal Pembayaran
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Over</th>
                    <th className="border border-gray-300 px-4 py-2">Saldo</th>
                    <th className="border border-gray-300 px-4 py-2">ARHO</th>
                    <th className="border border-gray-300 px-4 py-2">ARRO</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`${
                          rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Proses}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.KODE_POS}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Agreement}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Nama_Cust}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Alamat}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Model}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Nopol}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Warna}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Thn_Mobil}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.UN}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Ang_ke}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Jml_Ang.toLocaleString()}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Nil_Ang.toLocaleString()}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Tgl_Due}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Tgl_Bayar}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Over}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.Saldo}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.ARHO}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {row.ARRO}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
