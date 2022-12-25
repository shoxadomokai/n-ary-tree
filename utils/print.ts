import { Employee } from "../types";

function printData(element: Employee, header: string): void {
  console.log("Path:", header + element.uniqueId, "| Name:", element.name);
  element.subordinates.forEach(sub => {
    printData(sub, header + element.uniqueId + "-");
  });
}

export default printData;
