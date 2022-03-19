import Page from "common/components/page"
import ReactPlayer from "react-player/lazy"

export const DemoPage = () => {
  return (
    <Page>
      <div className="container">
        <ReactPlayer
          width="50vw"
          height="50vh"
          url="videos/demo.mp4"
          controls={true}
          onError={() => console.log("Can't play video")}
          onEnded={() => alert("Hope you enjoyed our project, rawr xD!")}
        />
      </div>
    </Page>
  )
}