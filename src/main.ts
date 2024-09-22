import download from 'downloadjs';
import { PDFDocument, degrees } from 'pdf-lib'

document.getElementById("finish-button")!.onclick = async function (_: MouseEvent) {
  const fileSelectElement: HTMLInputElement = document.getElementById("file-select")! as HTMLInputElement;
  const action: string = (document.getElementById("action") as HTMLInputElement).value;

  if (fileSelectElement.files!.length != 1) {
    alert("You must upload a single PDF file!");
    return;
  }

  const file: File = fileSelectElement.files!.item(0)!;

  const doc = await PDFDocument.load(await file.arrayBuffer());

  const rotate = (deg: number) => doc.getPages().forEach(page => page.setRotation(degrees(deg)));

  switch (action) {
    case "rotate90":
      rotate(90);
      break;
    case "rotate180":
      rotate(180);
      break;
    case "rotate270":
      rotate(270);
      break;
    case "pagenumbers":
      doc.getPages().forEach((page, index) => {
        page.drawText((index + 1).toString(), { x: 10, y: 10 });
      });
      break;
    case "metadata":
      let page = doc.insertPage(0);
      const metadata = {
        "Author": doc.getAuthor(),
        "Creation Date": doc.getCreationDate(),
        "Creator": doc.getCreator(),
        "Keywords": doc.getKeywords(),
        "Modification Date": doc.getModificationDate(),
        "Producer": doc.getProducer(),
        "Subject": doc.getSubject(),
        "Title": doc.getTitle()
      }
      Object.entries(metadata).forEach(([key, value], index) => {
        page.drawText(key + ": " + value?.toString(), {
          x: 30,
          y: page.getHeight() - 60 - (index * 15),
          size: 10
        })
      });
      break;
  }

  doc.setProducer("pdf-tools (https://github.com/michael-m-2983/pdf-tools)");

  // The below code works on certain platforms, but not all of them. 
  // window.open(await doc.saveAsBase64({ dataUri: true }), "_blank")?.focus();

  download(await doc.save(), file.name, "application/pdf");
}