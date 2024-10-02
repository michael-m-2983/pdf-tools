import download from 'downloadjs';
import { PDFDocument, degrees } from 'pdf-lib'

document.getElementById("finish-button")!.onclick = async function (_: MouseEvent) {
  const fileSelectElement: HTMLInputElement = document.getElementById("file-select")! as HTMLInputElement;
  const action: string = (document.getElementById("action") as HTMLInputElement).value;

  if (fileSelectElement.files!.length <= 0) {
    alert("You must upload at least one PDF file!");
    return;
  }

  for(let i = 0; i < fileSelectElement.files!.length; i++) {
    const file: File = fileSelectElement.files!.item(i)!;

    let doc = await PDFDocument.load(await file.arrayBuffer());
    processDocument(doc, action);

    doc.setProducer("pdf-tools (https://github.com/michael-m-2983/pdf-tools)");

    // The below code works on certain platforms, but not all of them. 
    // window.open(await doc.saveAsBase64({ dataUri: true }), "_blank")?.focus();

    download(await doc.save(), file.name, "application/pdf");
  }
}

/**
 * Applies the given action to the given document.
 * 
 * @param doc The PDF
 * @param action The string label for an action.
 */
function processDocument(doc: PDFDocument, action: string) {
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
    case "flipx":
      doc.getPages().forEach(page => page.scale(-1, 1));
      break;
    case "flipy":
      doc.getPages().forEach(page => page.scale(1, -1));
      break;
    case "pagenumbers":
      doc.getPages().forEach((page, index) => {
        page.drawText((index + 1).toString(), { x: 10, y: 10 });
      });
      break;
    case "reverse":
      doc.getPages().forEach((page, index) => {
        doc.removePage(index);
        doc.insertPage(0, page);
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
}