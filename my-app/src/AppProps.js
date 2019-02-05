const forkStructure = {
  id: "",
  repo: "",
  baseURL: "",
  timestamp: ""
}

const PRStructure = {
  id: "",
  title: "",
  link: "",
  status: "",
  timestamp: ""
}

const mapFork = (structure, element) =>
  ({
    ...structure,
    id: element.id,
    repo: element.repo.name,
    baseURL: element.repo.url,
    timestamp: element.created_at
  })

const mapPR = (structure, element) =>
  ({
    ...structure,
    id: element.id,
    title: element.payload.pull_request.title,
    link: element.payload.pull_request.html_url,
    status: element.payload.action,
    timestamp: element.created_at
  })

export const destructureEvents = (eventArr, mapCallback, type, structure) =>
  eventArr
    .filter((element) => element.type === type)
    .map(mapCallback.bind(null, structure))
    .sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return -1;
      } else if (a.timestamp > b.timestamp) {
        return 1;
      }
      return 0;}
    )

export const eventFilter = [
  {
    radioLabel: "Pull Requests",
    githubEventName:"PullRequestEvent",
    caption: "Recent Pull Requests",
    mapCallback: mapPR,
    dataStructure: PRStructure
  },
  {
    radioLabel: "Forks",
    githubEventName: "ForkEvent",
    caption: "Recent Forks",
    mapCallback: mapFork,
    dataStructure: forkStructure
  }
]
