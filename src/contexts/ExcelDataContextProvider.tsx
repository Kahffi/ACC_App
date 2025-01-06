import { ReactNode, useContext, useEffect, useState } from "react";
import ExcelDataContext, { ProcessedData } from "./ExcelDataContext";
import { AuthContext } from "./AuthContext";
import { database } from "@/firebase";
import { onValue, ref } from "firebase/database";

export default function ExcelDataContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [excelData, setExcelData] = useState<ProcessedData[] | null>(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) return;
    const dbRef = ref(database, "uploads");
    const clean = onValue(dbRef, (snapshot) => {
      const firebaseData: ProcessedData[] = snapshot.val();
      console.log("Data yang diterima dari Firebase:", firebaseData);
      if (firebaseData) {
        // if not admin, filter the data based on username
        if (!currentUser.isAdmin) {
          const filteredData = Object.values(firebaseData).filter(
            ({ ARHO, ARRO }) => {
              return (
                ARHO.replace(/[^a-zA-Z]/gm, "").toLocaleLowerCase() ===
                  currentUser.fullName.toLocaleLowerCase() ||
                ARRO.replace(/[^a-zA-Z]/gm, "").toLocaleLowerCase() ===
                  currentUser.fullName.toLocaleLowerCase()
              );
            }
          );
          setExcelData(Object.values(filteredData));
        } else {
          setExcelData(Object.values(firebaseData));
        }
      }
    });
    return () => clean();
  }, [currentUser]);

  useEffect(() => {});
  return (
    <ExcelDataContext.Provider value={excelData}>
      {children}
    </ExcelDataContext.Provider>
  );
}
