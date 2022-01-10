const formatDateTime = (nodeDateTime) => {
  let dateTimeObject = new Date(nodeDateTime);

  // options for the toLocaleString method
  const options = {
    year:"numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"
  }
  let dateTime = dateTimeObject.toLocaleString('it-IT', options);
  let formatedDateTime = dateTime.replaceAll("/", "-").replace(",", "");
  return formatedDateTime;
}

export const removeTimeline = (id) => {
  document.getElementById(id).innerHTML = "";
};

export const addToTimeline = (id, lineNodes) => {
  //console.log(lineNodes);
  lineNodes.forEach((node) => {
    document.getElementById(id).innerHTML += `
    <div class="timeline__node mobile-flex mobile-flex--justifyCenter">
      <div class="timeline__balloon">
        <h3 class="timeline__title">${node.name}</h3>
        <p class="timeline__datetime">${formatDateTime(node.created)}</p>
      </div>
    </div>
    `;
  });
};
