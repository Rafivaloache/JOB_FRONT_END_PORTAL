import { io } from "socket.io-client";

export const socket = io("https://job-portal-website-back-end.vercel.app/", {
    withCredentials: true
});