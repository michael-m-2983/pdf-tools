import { PDFDocument, degrees } from 'pdf-lib'

document.getElementById("finish-button")!.onclick = async function(_: MouseEvent) {
  const fileSelectElement: HTMLInputElement = document.getElementById("file-select")! as HTMLInputElement;
  const action: string = (document.getElementById("action") as HTMLInputElement).value;

  if(fileSelectElement.files!.length != 1) {
    alert("You must upload a single PDF file!");
    return;
  }

  const file: File = fileSelectElement.files!.item(0)!;

  const doc = await PDFDocument.load(await file.arrayBuffer());

  const rotate = (deg: number) => doc.getPages().forEach(page => page.setRotation(degrees(deg)));

  switch(action) {
    case "rotate90":
      rotate(90);
      break;
    case "rotate180":
      rotate(180);
      break;
    case "rotate270":
      rotate(270);
      break;
  }
  
  window.open(await doc.saveAsBase64({dataUri: true}));
}