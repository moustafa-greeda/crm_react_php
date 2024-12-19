const ProjectProgress = ({ tasks }) => {
    const statuses = ["To Do", "In Progress", "Review", "Completed"];
  
    // Function to calculate progress for each task
    const calculateProgress = (status) => statuses.indexOf(status) + 1;
  
    return (
      <div className="container my-5">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="progress-container p-3 bg-light rounded mb-4">
              <h5 className="mb-3">{task.projectname}</h5>
              <div className="d-flex justify-content-between mb-3">
                {statuses.map((status, index) => (
                  <div key={index} className="text-center">
                    <span
                      className={`icon ${index < calculateProgress(task.status) ? 'text-success' : 'text-muted'}`}
                    >
                      &#10003;
                    </span>
                    <p>{status}</p>
                  </div>
                ))}
              </div>
              <div className="progress">
                {statuses.map((status, index) => (
                  <div
                    key={index}
                    className={`progress-bar ${index < calculateProgress(task.status) ? 'bg-primary' : 'bg-light'}`}
                    style={{ width: `${100 / statuses.length}%` }}
                  ></div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    );
  };
  
  export default ProjectProgress;