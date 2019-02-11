const convertStringToFetch = (url) =>
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();})
  .catch(() => "Check username")

const fetchEndpoints = (...allEndpoints) =>
  Promise.all(allEndpoints.map(element => this.convertStringToFetch(element)));

//thunk
export const fetchUsernameThunk = (username) => {
  dispatch(fetchUsernameBegin());
  return (dispatch) => convertStringToFetch(`https://api.github.com/users/${username}`)
    .then(() => dispatch(fetchUsernameSuccess(username)))
    .catch((error) => dispatch(fetchUsernameFailure(error)))
}

const fetchDataThunk = () => {
  return (dispatch) => ({
    dispatch(fetchDataBeginning());
    fetchEndpoints(`https://api.github.com/users/${username}/events`,
      `https://api.github.com/users/${username}/repos?`)
    .then(responseArr => {
    //destructure events endpoint for each event
      let events = eventFilter
        .reduce(getreduceCallback(responseArr[0]), {ForkEvent: null, PullRequestEvent: null});

      //destructure repos endpoint for each event
      if(events.ForkEvent.length === 0) {
        events.ForkEvent = responseArr[1]
          .filter(element => element.fork)
          .map((element) => element.name);
      }

      //fetch all pull requests listed and mutate events object
      return fetchEndpoints(events.PullRequestEvent
        .map(element => element.JSONUrl))
      .then(response => {
        events.PullRequestEvent.forEach((element, index) =>
          element.status = response[index].state);
        dispatch(fetchDataSuccess(events));
      });
    })
    .catch((error) => dispatch(fetchDataFailure(error)));
  });
}
