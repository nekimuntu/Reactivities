import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/Activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid'
import {format} from 'date-fns'

export default class ActivityStore {

    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    submitting = false;

    constructor() {
        makeAutoObservable(this)
    }
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivities(){

        return Object.entries(
            this.activitiesByDate.reduce((activities,activity)=>{
                const date = format(activity.date!, 'dd MM yyyy h:mm aa');
                activities[date]=activities[date] ?[...activities[date],activity]
                                                  : [activity];
                return activities;
            },{} as {[key:string]:Activity[]})
        )
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(x => {
                this.setActivity(x);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        this.setLoadingInitial(true);
        let activity = this.getActivity(id);
        if (activity) {

            this.setActivity(activity);
            this.setLoadingInitial(false);
            return (this.selectedActivity);
        } else {
            try {
                activity = await agent.Activities.details(id);

                this.setActivity(activity);
                this.setLoadingInitial(false);
                return (this.selectedActivity);
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = this.activityRegistry.get(activity.id);
    }
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    //This action method we needs it to follow MOBX requirements for asyn/await 
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    update = async (activ: Activity) => {
        this.setSubmitting(true);
        this.loading = true;
        try {
            await agent.Activities.create(activ);
            runInAction(() => {
                // this.activities = [...this.activities, activ];
                this.activityRegistry.set(activ.id, activ);
                this.editMode = false;
                this.selectedActivity = activ;
                this.setSubmitting(false);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                this.setSubmitting(false);
            });
        }
    }

    create = async (activ: Activity) => {
        this.setSubmitting(true);
        this.loading = true;
        try {

            await agent.Activities.update(activ);
            runInAction(() => {
                // this.activities = [...this.activities.filter(x => x.id !== activ.id), activ];
                this.activityRegistry.set(activ.id, activ);
                this.editMode = false;
                this.selectedActivity = activ;
                this.setSubmitting(false);
                this.loading = false;
            })


        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                this.setSubmitting(false);
            });
        }
    }

    setSubmitting = (state: boolean) => {
        this.submitting = state;
    }

    deleteActivity = async (id: string) => {
        this.setSubmitting(true);
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                // this.activities = [...this.activities.filter(x => x.id !== id)];
                this.activityRegistry.delete(id);
                this.setSubmitting(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setSubmitting(true);
            })
        }
    }
}