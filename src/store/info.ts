import { atom } from "nanostores";

export const year = atom(new Date().getFullYear());
