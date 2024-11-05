function Project(props) {
  const project = props.project;
  return (
    <div className="project-intro">
      <h1 className="main-title">{project.title}</h1>

      <div className="intro-left-container-type1">
        <div className="intro-section">
          {project.introType.map((intro) => {
            return (
              <>
                <h3 className="intro-sub-title">{intro.title}</h3>
                <p className="intro-description">{intro.paragraph}</p>
              </>
            );
          })}
        </div>
      </div>

      <div className="intro-right-container">
        <div className="intro-section">
          <h3 className="intro-sub-title">{project.areasOfExpertise.title}</h3>
          <p className="intro-description">
            {project.areasOfExpertise.content}
          </p>
        </div>
        <div className="intro-section">
          <h3 className="intro-sub-title"> {project.tools.title}</h3>
          <p className="intro-description"> {project.tools.content}</p>
        </div>{" "}
        <div className="intro-section">
          <h3 className="intro-sub-title">{project.deliveryDate.title}</h3>
          <p className="intro-description"> {project.deliveryDate.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Project;
