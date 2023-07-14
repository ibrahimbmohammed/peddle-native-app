import {gql} from '@apollo/client';

export const MY_ORGANISATIONS = gql`
  query {
    myOrganizations {
      id
      pk
      name
      abbrev
      about
      photoUrl
      slug
      join
    }
  }
`;

export const ORGANISATIONS = gql`
  query {
    organizationsList {
      totalCount
      edges {
        node {
          id
          pk
          name
          abbrev
          photoUrl
          about
          slug
          join
        }
      }
    }
  }
`;

export const NOTIFICATIONS = gql`
  query {
    notifications {
      id
      subject
      sms
      email
      push
      read
      createdAt
    }
  }
`;
export const NOTIFICATION = gql`
  query NotificationType($id: Int!) {
    notification(id: $id) {
      id
      subject
      sms
      email
      push
      read
      createdAt
    }
  }
`;

export const IS_ORG_ADMIN = gql`
  query Boolean($organizationId: Int!) {
    isOrgAdmin(organizationId: $organizationId)
  }
`;

export const EVENT_MEMBERS = gql`
  query EventCheckInType($orgId: Int!, $eventId: Int!) {
    eventCheckIn(orgId: $orgId, eventId: $eventId) {
      user {
        id
        pk
        username
        firstName
        lastName
        qrCode
      }
      attendance {
        id
        present
        interested
      }
    }
  }
`;

export const EVENTS = gql`
  query {
    events {
      id
      pk
      name
      startDate
      startTime
      venue
      flyer
      photoUrl
      url
      org {
        pk
        name
        slug
      }
    }
  }
`;

export const ANNOUCEMENTS = gql`
  query {
    announcements {
      id
      pk
      title
      body
      sms
      photoUrl
      created
      updated
      actionText
      event {
        id
        pk
        name
        startDate
        startTime
        venue
        flyer
      }
      org {
        name
        slug
      }
    }
  }
`;

export const UP_COMING_EVENT = gql`
  query {
    upcomingEvents {
      id
      pk
      name
      startDate
      startTime
      venue
      onlineMeetingLink
      description
      flyer
      photoUrl
      minutesUrl
      url
      org {
        id
        pk
        name
        abbrev
        photoUrl
        about
        slug
        join
      }
    }
  }
`;

export const GET_REST_TOKEN = gql`
  query {
    getRestToken
  }
`;

export const GET_USER = gql`
  query {
    user {
      id
      username
      firstName
      photoUrl
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      pk
      id
      username
      photo
      socialAuthPhotoUrl
      member {
        edges {
          node {
            id
            approved
            organization {
              id
              pk
              name
              abbrev
              slug
              announcements {
                edges {
                  node {
                    id
                    pk
                    title
                    body
                    sms
                    photoUrl
                    created
                    updated
                    actionText
                    event {
                      id
                      pk
                      name
                      startDate
                      startTime
                      venue
                      flyer
                    }
                    org {
                      name
                      slug
                    }
                  }
                }
              }
              events {
                totalCount
                edges {
                  node {
                    id
                    pk
                    name
                    startDate
                    startTime
                    venue
                    onlineMeetingLink
                    description
                    flyer
                    photoUrl
                    minutesUrl
                    url
                    org {
                      id
                      pk
                      name
                      abbrev
                      photoUrl
                      about
                      slug
                      join
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SORTED_SCHEDULE = gql`
  query Schedule($eventSlug: String) {
    sortedSchedules(eventSlug: $eventSlug) {
      id
      title
    }
  }
`;
export const SCHEDULE = gql`
  query ScheduleType($eventSlug: String) {
    schedules(eventSlug: $eventSlug) {
      id
      title
      location
      description
      scheduleDate
      scheduleStartTime
      scheduleEndTime
      speaker {
        name
        picture
      }
      meeting {
        id
        name
        theme
        description
        venue
        attendance
        code
        minutes
        startTime
        endTime
      }
    }
  }
`;

export const PRESENTER = gql`
  query PresenterType($eventSlug: String) {
    presenters(eventSlug: $eventSlug) {
      id
      name
      picture
      photoUrl
      bio
      slug
      person {
        username
        firstName
        lastName
      }
    }
  }
`;

export const PRESENTATION = gql`
  query PresentationType($eventSlug: String) {
    presentations(eventSlug: $eventSlug) {
      id
      title
      author {
        id
        name
        picture
        bio
      }
      file
      abstract
      slug
      view
      meeting {
        id
        name
        theme
      }
    }
  }
`;
