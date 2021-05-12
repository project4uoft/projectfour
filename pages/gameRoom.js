import SidePanel from "../components/gameroom/side-panel/SidePanel";
import MainPanel from "../components/gameroom/main-panel/MainPanel.js";
import Navbar from "../components/Navbar";
import Meta from "../components/Meta";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function GameRoom() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <>
        <Meta title="Game Room" />
        <Navbar />
        <div className="flex flex-row flex-auto h-screen">
          <SidePanel />
          <MainPanel />
        </div>
      </>
    );
  }
});
