import { useEffect, useState } from "react";
import { workoutProgram as training_plan } from "../utils/index.js";
import WorkoutCard from "./WorkoutCard.jsx";

function Grid() {
  const [savedWorkouts, setSavedWorkouts] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
    const entry = savedWorkouts[val];
    return entry.isComplete;
  });

  function handleSave(index, data) {
    const newObj = {
      ...savedWorkouts,
      [index]: {
        ...data,
        isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete,
      },
    };
    setSavedWorkouts(newObj);
    localStorage.setItem("shredstack", JSON.stringify(newObj));
    setSelectedWorkout(null);
  }

  function handleComplete(index, data) {
    const newObj = { ...data };
    newObj.isComplete = true;
    handleSave(index, newObj);
  }

  useEffect(() => {
    if (!localStorage) {
      return;
    }

    let savedData = {};

    if (localStorage.getItem("shredstack")) {
      savedData = JSON.parse(localStorage.getItem("shredstack"));
    }
    setSavedWorkouts(savedData);
  }, []);

  return (
    <div className="training-grid-plan">
      {Object.keys(training_plan).map((workout, workoutidx) => {
        const isLocked =
          workoutidx === 0
            ? false
            : completedWorkouts?.includes(`${workoutidx - 1}`)
            ? false
            : true;

        const type =
          workoutidx % 3 === 0
            ? "Push"
            : workoutidx % 3 === 1
            ? "Pull"
            : "Legs";

        const trainingPlan = training_plan[workoutidx];
        const dayNum =
          workoutidx / 8 <= 1 ? "0" + (workoutidx + 1) : workoutidx + 1;
        const icon =
          workoutidx % 3 === 0 ? (
            <i className="fa-solid fa-dumbbell"></i>
          ) : workoutidx % 3 === 1 ? (
            <i className="fa-solid fa-weight-hanging"></i>
          ) : (
            <i className="fa-solid fa-bolt"></i>
          );

        if (selectedWorkout === workoutidx) {
          return (
            <WorkoutCard
              key={workoutidx}
              trainingPlan={trainingPlan}
              workoutidx={workoutidx}
              type={type}
              dayNum={dayNum}
              icon={icon}
              handleSave={handleSave}
              handleComplete={handleComplete}
              savedWeights={savedWorkouts?.[workoutidx]?.weights}
            />
          );
        }

        return (
          <button
            className={"card plan-card " + (isLocked ? "inactive" : "")}
            key={workoutidx}
            onClick={() => {
              setSelectedWorkout(workoutidx);
            }}
            disabled={isLocked}
          >
            <div className="plan-card-header">
              <p>Day {dayNum}</p>
            </div>
            {isLocked ? <i className="fa-solid fa-lock"></i> : icon}
            <div className="plan-card-header">
              <h4>
                <b>{type}</b>
              </h4>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default Grid;
