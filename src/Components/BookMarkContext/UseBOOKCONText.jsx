import { useContext } from "react";
import { BookmarkContext } from "./BookMarkContext";

export const useBookmark = () => useContext(BookmarkContext);