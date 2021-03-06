import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../API/agent";

configure({ enforceActions: "always" });
class ActivityStore {
  @observable activityRegistry = new Map();
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
  @observable setSubmiting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading activities error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  //   create Activity
  @action createActivity = async (activity: IActivity) => {
    this.setSubmiting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("create activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.setSubmiting = false;
      });
    } catch (error) {
      runInAction("create activity error", () => {
        console.log(error);
        this.setSubmiting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.setSubmiting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("edit activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.setSubmiting = false;
      });
    } catch (error) {
      runInAction("edit activity error", () => {
        this.setSubmiting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.setSubmiting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("delete activity ", () => {
        this.activityRegistry.delete(id);
        this.setSubmiting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete activity error", () => {
        this.setSubmiting = false;
        this.target = "";
      });

      console.log(error);
    }
  };
  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activity", () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("getting activity error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };
  // unmount activity from input form
  @action clearActivity = () => {
    this.activity = null;
  };
  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };
}
export default createContext(new ActivityStore());
