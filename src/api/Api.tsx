export const API_PATHS = {
  baseUrl: "http://localhost:8080",
  routes: {
    client: {
      path: () => API_PATHS.baseUrl + "/api/v1/client",
      routes: {
        getAll: () => API_PATHS.routes.client.path() + "/all",
        getOne: (clientId: string) => API_PATHS.routes.client.path() + "/" + clientId,
        deleteOne: (clientId: string) => API_PATHS.routes.client.path() + "/" + clientId
      }
    },
    project: {
      path: () => API_PATHS.baseUrl + "/api/v1/project",
      routes: {
        getProjectsForClient: (clientId: string) => API_PATHS.routes.client.routes.getOne(clientId) + "/projects",
        getAll: () => API_PATHS.routes.project.path() + "/all",
        getOne: (projectId: string) => API_PATHS.routes.project.path() + "/" + projectId,
        deleteOne: (projectId: string) => API_PATHS.routes.project.path() + "/" + projectId
      }
    },
    people: {
      path: () => API_PATHS.baseUrl + "/api/v1/people",
      routes: {
        getAll: () => API_PATHS.routes.people.path() + "/all",
        getOne: (personId: string) => API_PATHS.routes.people.path() + "/" + personId,
        deleteOne: (personId: string) => API_PATHS.routes.people.path() + "/" + personId
      }
    },
    fillableSlot: {
      path: () => API_PATHS.baseUrl + "/api/v1/fillable-slot",
      routes: {
        getAllOnProject: (projectId: string) => API_PATHS.routes.project.routes.getOne(projectId) + "/fillable-slot",
        getOne: (slotId: string) => API_PATHS.routes.fillableSlot.path() + "/" + slotId,
        deleteOne: (slotId: string) => API_PATHS.routes.fillableSlot.path() + "/" + slotId,

        getAllPeople: (slotId: string) => API_PATHS.routes.fillableSlot.routes.getOne(slotId) + "/people",
        addPerson: (slotId: string) => API_PATHS.routes.fillableSlot.routes.getOne(slotId) + "/people",
        deletePerson: (slotId: string, personId: string) => API_PATHS.routes.fillableSlot.routes.getOne(slotId) + "/people/" + personId
      }
    }
  }
}

