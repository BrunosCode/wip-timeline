import "./style.scss";
import axios from "axios";

let nextPage = null;

axios("https://swapi.dev/api/planets", {
  params: {
    page: null
  }
})
.then((res) => {
  console.log(res.data.results);
  console.log(res.data.next);
});
