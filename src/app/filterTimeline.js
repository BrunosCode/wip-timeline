export const filterTimeline = (nodesArray) => {
  // get filter dates
  let startDate = new Date(document.getElementById("start-date").value);
  let endDate = new Date(document.getElementById("end-date").value);

  // return an array of filtered nodes
  return nodesArray.filter((node) => {
    let nodeDate = new Date(node.created);
    if (startDate < nodeDate && nodeDate < endDate) {
      return node;
    }
  });
};
