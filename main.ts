import { ceo } from "./data";
import { EmployeeOrgApp, Employee } from "./types";
import { printData } from "./utils";

// const startTime = Date.now();
// app.move(3, 2);
// const afterMove = Date.now();
// app.undo();
// const afterUndo = Date.now();
// app.redo();
// const afterRedo = Date.now();
// console.log(afterMove - startTime);
// console.log(afterUndo - afterMove);
// console.log(afterRedo - afterUndo);
// app.undo();
// console.log(app.ceo);

function main(): void {
  const app = new EmployeeOrgApp(ceo);

  // printData(app.ceo, "");

  // console.log("================ Move(3, 2) ================");
  // app.move(3, 2);
  // printData(app.ceo, "");

  // console.log("================ Undo() ================");
  // app.undo();
  // printData(app.ceo, "");

  // console.log("================ Redo() ================");
  // app.redo();
  // printData(app.ceo, "");
}

main();
