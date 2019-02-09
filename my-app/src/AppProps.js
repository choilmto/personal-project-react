import React from 'react';

const mapFork = (element) =>
  ({
    id: element.id,
    repo: element.repo.name.split("/")[1],
    baseUrl: `https://github.com/${element.repo.name}`
  })

const mapPR = (element) =>
  ({
    id: element.id,
    title: element.payload.pull_request.title,
    link: element.payload.pull_request.html_url,
JSONUrl: `${element.payload.pull_request.url}`
  })

const formatFork = item => <a href={item.baseUrl} target="_blank">{item.repo}</a>;

const formatPR = item => <a href={item.link} target="_blank">
  {`${item.status[0].toUpperCase()} ${item.title}`}</a>

export const reduceCallback = (githubJSON, destructureEvents, accumulator, currentVal) =>
  ({
    ...accumulator,
    [currentVal.githubEventName]: {
      ...currentVal,
      data: destructureEvents(githubJSON, currentVal.mapCallback,
        currentVal.githubEventName)
    }
  })

export const destructureEvents = (eventArr, mapCallback, type) =>
  eventArr
    .filter((element) => element.type === type)
    .map(mapCallback)

export const eventFilter = [
  {
    radioLabel: "Pull Requests",
    githubEventName:"PullRequestEvent",
    title: "Recent Pull Requests",
    mapCallback: mapPR,
    format: formatPR
  },
  {
    radioLabel: "Forks",
    githubEventName: "ForkEvent",
    title: "Recent Forks",
    mapCallback: mapFork,
    format: formatFork
  }
]
