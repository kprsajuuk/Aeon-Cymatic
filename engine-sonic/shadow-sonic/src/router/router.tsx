import { redirect } from 'react-router-dom';
import Test from '../pages/test';
import MusicSearch from "@/pages/MusicSearch/Music";

const router = [
    { path: "test/a", element: <Test />, name: "test" },
    { path: "search", element: <MusicSearch />, name: "search" },
    { path: "beat", element: <Test />, name: "beat" },
    { path: "visual", element: <Test />, name: "visual" },
]

export default router;