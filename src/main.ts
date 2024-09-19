document.getElementById("finish-button")!.onclick = function(_: MouseEvent) {
  // Get Input PDF
  const fileSelectElement: HTMLInputElement = document.getElementById("file-select")! as HTMLInputElement;

  //TODO: Validate that there is a file
  //TODO: Validate the type of file
  for(let i = 0; i < fileSelectElement.files!.length; i++) {
    alert(fileSelectElement.files!.item(i)?.name);
  }
  
  // Perform action
  // Download PDF
}