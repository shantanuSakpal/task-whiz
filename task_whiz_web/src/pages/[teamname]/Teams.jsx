import React, { useState, useEffect } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.config.jsx"; // Update this path with the correct path to

import { employeesData, employeesGrid } from "../../data/dummy.jsx";
import { Header } from "../../components/index.jsx";

const Team = () => {
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  const [employeesData, setEmployeesData] = useState([]);
  

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesCollection = collection(db, "employees");
        const employeesSnapshot = await getDocs(employeesCollection);
        const employeesData = employeesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(employeesData);
        setEmployeesData(employeesData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Team" />
      <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default Team;
