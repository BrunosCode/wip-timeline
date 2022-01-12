const { nodeObserver } = require("./observers");

const formatDateTime = (nodeDateTime) => {
  let dateTimeObject = new Date(nodeDateTime);

  // options for the toLocaleString method
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let dateTime = dateTimeObject.toLocaleString("it-IT", options);
  let formatedDateTime = dateTime.replaceAll("/", "-").replace(",", " at");
  return formatedDateTime;
};

export const removeTimeline = (id) => {
  document.getElementById(id).innerHTML = "";
};

export const addToTimeline = (id, lineNodes) => {
  let timeline = document.getElementById(id);
  lineNodes.forEach((node, i) => {
    let nodeHtml = document.createElement('div');
    nodeHtml.classList.add('timeline__node', 'mobile-flex', 'mobile-flex--alignCenter');
    nodeHtml.innerHTML = `
        <div class="planet">
          <div class="planet__cloud planet__cloud--1"></div>
          <div class="planet__cloud planet__cloud--2"></div>
          <div class="planet__cloud planet__cloud--3"></div>
          <div class="planet__cloud planet__cloud--4"></div>
        </div>
        <div class="timeline__balloon">
          <h3 class="timeline__title"><small class="sm-show--none lg-show">Planet:</small> ${node.name}</h3>
          <p class="timeline__datetime"><span class="sm-show--none lg-show">Discovered on</span> ${formatDateTime(
            node.created
          )}</p>
        </div>
    `;
    nodeObserver.observe(nodeHtml);
    timeline.append(nodeHtml);
  })
};
