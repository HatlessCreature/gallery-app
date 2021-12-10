export default function GalleryRow({ gallery }) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "start",
          alignItems: "center",
          border: "solid",
          margin: "5px"
        }}
      >
        <div style={{ padding: "10px" }}>
          <img src={gallery.images[0].url} width="100" alt="Gallery cover" />
        </div>
        <div style={{ padding: "10px" }}>{gallery.title}</div>
        <div style={{ padding: "10px" }}>{gallery.description}</div>
        <div style={{ padding: "10px" }}>By {gallery.user.first_name} {gallery.user.last_name}</div>

      </div>
    );
  }