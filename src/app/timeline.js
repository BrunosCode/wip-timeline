const formatDate = (nodeDate) => {
  const options = {
    year:"numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"
  }

  let dateObject = new Date(nodeDate);
  let date = dateObject.toLocaleString('it-IT', options);
  let formatedDate = date.replaceAll("/", "-").replaceAll(",", "");
  return formatedDate;
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
        <p class="timeline__datetime">${formatDate(node.created)}</p>
      </div>
    </div>
    `;
  });
};
