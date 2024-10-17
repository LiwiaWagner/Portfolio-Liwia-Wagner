function Project(props) {
  const project = props.project;
  return (
    <div className="main-container">
      {/* <div className="intro-container">
        <h1 className="main-title">{project.title}</h1>
        <div className="intro-left-container-type1">
          {project.introType1.title}
          {project.introType1.paragraph}
        </div>
        <div className="intro-left-container-type2"></div>
        <div className="intro-right-container">
          {project.deliveryDate.title}
          {project.deliveryDate.content}
          {project.areasOfExpertise.title}
          {project.areasOfExpertise.content}
          {project.tools.title}
          {project.tools.content}
        </div>
      </div> */}
      <div>{project.image}</div>
    </div>
  );
}

export default Project;
