import "./style.scss";
import axios from "axios";
import { removeTimeline, addToTimeline } from "./app/timeline.js";
import { reorderTimeline } from "./app/reorderTimeline.js";
import { filterTimeline } from "./app/filterTimeline.js";

// DOM elements
const inverteBtn = document.getElementById("inverte-btn");
const filterBtn = document.getElementById("filter-btn");
const resetBtn = document.getElementById("reset-btn");
const burgerBtn = document.getElementById("burger-btn");
const arrow = document.querySelector(".arrow");

// Global variables
const startUrl = "https://swapi.dev/api/planets";
let nextUrl = null;
let nodesArray = [];
let order = null;
let filteredMode = false;

// AXIOS FUNCTION
const apiCall = (url) => {
  axios(url)
    .then((res) => {
      // store next page link
      nextUrl = res.data.next;

      // store nodes
      nodesArray.push(...res.data.results);

      // call render function
      addToTimeline("timeline", res.data.results);
    })
    .catch((e) => {
      throw e;
    });
};

// EVENT LISTENERS
window.onscroll = () => {
  // when user reach the bottom add other nodes
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight 
    && nextUrl 
    && !filteredMode
    ) {
    apiCall(nextUrl);
  }
};

inverteBtn.addEventListener("click", () => {
  removeTimeline("timeline");
  // reorder
  addToTimeline("timeline", reorderTimeline(nodesArray, order));

  // Toggle order variable
  order = order != "desc" ? "desc" : "asc";
  
  // Toggle arrow class
  arrow.classList.toggle("up");
  arrow.classList.toggle("down");
});

filterBtn.addEventListener("click", () => {
  filteredMode = true;

  removeTimeline("timeline");
  // filter timeline
  addToTimeline("timeline", filterTimeline(nodesArray));
});

resetBtn.addEventListener("click", () => {
  removeTimeline("timeline");
  // restart
  addToTimeline("timeline", nodesArray);
});

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("burger--open");
  document.getElementById("header-menu").classList.toggle("sm-show--none");
})

// START SCRIPT
apiCall(startUrl);