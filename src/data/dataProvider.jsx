import React, {
  createContext,
  useState,
  useContext,
} from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [grade, setGrade] = useState(200);
  const [hasAlert, setHasAlert] = useState();
  const [courseData, setCourseData] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [courseTotal, setCourseTotal] = useState([]);

  const value = {
    isLogin,
    setIsLogin,
    grade,
    setGrade,
    hasAlert,
    setHasAlert,
    courseData,
    setCourseData,
    courseList,
    setCourseList,
    courseTotal,
    setCourseTotal,
    //a,
    //setA,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};

// 使用方法
// const App = () => {
//   const { a, setA } = useDataContext();
// }
