import { io } from "socket.io-client";
import { BACKEND_API } from "./CONF";

export const socket = io(BACKEND_API, { withCredentials: true });