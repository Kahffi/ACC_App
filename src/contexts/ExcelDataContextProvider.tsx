import { ReactNode, useContext, useEffect, useState } from "react";
import ExcelDataContext, { ProcessedData } from "./ExcelDataContext";
import { AuthContext } from "./AuthContext";
import { database } from "@/firebase";
import { onValue, ref } from "firebase/database";

type FirebaseFetchResult = {
  time: number;
  data: ProcessedData[];
};

export default function ExcelDataContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [excelData, setExcelData] = useState<ProcessedData[] | null>(null);
  const { currentUser } = useContext(AuthContext);
  const [timeUploaded, setTimeUploaded] = useState<null | number>(null);

  //   fetch excel data from firebase
  useEffect(() => {
    if (!currentUser) return;
    const dbRef = ref(database, "uploads");
    const clean = onValue(dbRef, (snapshot) => {
      const firebaseData: FirebaseFetchResult = snapshot.val();
      console.log("Data yang diterima dari Firebase:", firebaseData);
      if (firebaseData) {
        // if not admin, filter the data based on username
        if (!currentUser.isAdmin) {
          const filteredData = Object.values(firebaseData.data).filter(
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
          setTimeUploaded(firebaseData.time);
        } else {
          setExcelData(Object.values(firebaseData.data));
          setTimeUploaded(firebaseData.time);
        }
      }
    });
    return () => clean();
  }, [currentUser]);

  useEffect(() => {});
  return (
    <ExcelDataContext.Provider
      value={{ excelData, setExcelData, timeUploaded }}
    >
      {children}
    </ExcelDataContext.Provider>
  );
}
