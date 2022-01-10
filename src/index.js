import "./style.scss";
import axios from "axios";
import { removeTimeline, addToTimeline } from "./app/timeline.js";

let nextUrl = null;
let previousUrl = null;
let startUrl = "https://swapi.dev/api/planets";
let timeNodes = [];

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