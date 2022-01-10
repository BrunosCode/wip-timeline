export const reorderTimeline = (nodesArray, order) => {
  if (order != "desc") {
    nodesArray.sort((a,b) => {
      return new Date(b.created) - new Date(a.created);
    });
  } else {
    nodesArray.sort((a,b) => {
      return new Date(a.created) - new Date(b.created);
    });
  }

  return nodesArray;
}