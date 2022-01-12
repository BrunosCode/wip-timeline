export const filterTimeline = (nodesArray) => {
  // get filter dates
  let startDate = new Date(document.getElementById("start-date").value || "1994-08-29");
  let endDate = new Date(document.getElementById("end-date").value || "2022-01-11");


  // return an array of filtered nodes
  return nodesArray.filter((node) => {
    let nodeDate = new Date(node.created);
    if (startDate < nodeDate && nodeDate < endDate) {
      return node;
    }
  });
};
