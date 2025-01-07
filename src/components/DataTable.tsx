import { ProcessedData } from "@/contexts/ExcelDataContext";

export default function DataTable({ data }: { data: ProcessedData[] }) {
  return (
    <>
      {/* tampilan admin */}

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
                  <th className="border border-gray-300 px-4 py-2">Kode Pos</th>
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
                {data.map((row, rowIndex) => (
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
    </>
  );
}
