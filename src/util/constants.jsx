// export const BASE_URL = "/api"


// dev
// export const BASE_URL = "http://localhost:7777"

export const BASE_URL = 
    location.hostname === "localhost" ? "http://localhost:7777" : "/api"