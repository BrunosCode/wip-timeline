import "./style.scss";
import axios from "axios";
import { removeTimeline, addToTimeline } from "./app/timeline.js";
const getId = id => document.getElementById(id);

let nextUrl = null;
let previousUrl = null;
let startUrl = "https://swapi.dev/api/planets";
let timeNodes = [];
let order = null;

const apiCall = (url) => {
  axios(url)
    .then(res => {
      nextUrl = res.data.next;
      previousUrl = res.data.previous;

      let newNodes = res.data.results;
      timeNodes.push(...newNodes);
      addToTimeline("timeline", newNodes);
    })
    .catch(e => {
      throw(e)
    });
}

window.onload = () => {
  timeNodes = [];
  apiCall(startUrl);
};

window.onscroll = () => {
   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && nextUrl) {
    apiCall(nextUrl);
   }
};

getId("inverte").addEventListener("click", () => {

  const arrow = document.querySelector(".arrow");
  if (order != "desc") {
    timeNodes.sort((a,b) => {
      return new Date(b.created) - new Date(a.created);
    });
    order = "desc";
    arrow.classList.remove("down");
    arrow.classList.add("up");
  } else {
    timeNodes.sort((a,b) => {
      return new Date(a.created) - new Date(b.created);
    });
    order = "asc";
    arrow.classList.remove("up");
    arrow.classList.add("down");
  }

  removeTimeline("timeline");
  addToTimeline("timeline", timeNodes);
});

getId("apply-filters").addEventListener("click", () => {

  let startDate = new Date(getId("start-date").value);
  let endDate = new Date(getId("end-date").value);

  let timesNodesFiltered = timeNodes.filter(node => {
    let nodeDate = new Date(node.created);
    if (startDate < nodeDate && nodeDate < endDate) {
      return node;
    }
  });

  removeTimeline("timeline");
  addToTimeline("timeline", timesNodesFiltered);
});

