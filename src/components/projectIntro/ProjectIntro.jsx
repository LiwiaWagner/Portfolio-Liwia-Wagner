function ProjectIntro(props) {
  const projectIntro = props.projectIntro;

  return (
    <div className="project-intro">
      <h1 className="main-title">{projectIntro.title}</h1>

      <div className="intro-left-container-type1">
        <div className="intro-section">
          {projectIntro.introType.map((intro, index) => {
            return (
              <div key={index}>
                <h3 className="intro-sub-title">{intro.title}</h3>
                <p className="intro-description">{intro.paragraph}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="intro-right-container">
        <div className="intro-section">
          <h3 className="intro-sub-title">
            {projectIntro.areasOfExpertise.title}
          </h3>
          <p className="intro-description">
            {projectIntro.areasOfExpertise.content}
          </p>
        </div>
        <div className="intro-section">
          <h3 className="intro-sub-title"> {projectIntro.tools.title}</h3>
          <p className="intro-description"> {projectIntro.tools.content}</p>
        </div>
        <div className="intro-section">
          <h3 className="intro-sub-title">{projectIntro.deliveryDate.title}</h3>
          <p className="intro-description">
            {projectIntro.deliveryDate.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectIntro;
