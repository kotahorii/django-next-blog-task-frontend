import { atom } from "recoil";

export const selectedTaskState = atom({
  key: "selectedTaskState",
  default: { id: 0, title: "" },
});
