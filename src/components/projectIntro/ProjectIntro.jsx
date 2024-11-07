import { projectIntros } from "../../data/projectIntros";

function ProjectIntro(props) {
  const projectIntros = props.projectIntro;

  return (
    <div className="project-intro">
      <h1 className="main-title">{projectIntros.title}</h1>

      <div className="intro-left-container-type1">
        <div className="intro-section">
          {projectIntros.introType.map((intro, index) => {
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
            {projectIntros.areasOfExpertise.title}
          </h3>
          <p className="intro-description">
            {projectIntros.areasOfExpertise.content}
          </p>
        </div>
        <div className="intro-section">
          <h3 className="intro-sub-title"> {projectIntros.tools.title}</h3>
          <p className="intro-description"> {projectIntros.tools.content}</p>
        </div>
        <div className="intro-section">
          <h3 className="intro-sub-title">
            {projectIntros.deliveryDate.title}
          </h3>
          <p className="intro-description">
            {projectIntros.deliveryDate.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectIntro;
